console.log("Sitemap + dataLayer initialized for SHOWOFFFF");

(function () {
  "use strict";

  var DEFAULT_WAIT_TIMEOUT = 5000;
  var DEFAULT_WAIT_INTERVAL = 80;

  window.dataLayer = window.dataLayer || [];

  function getFileName() {
    var path = window.location.pathname || "";
    var bits = path.split("/");
    var fileName = bits[bits.length - 1] || "index.html";
    return fileName.toLowerCase();
  }

  function parsePrice(value) {
    if (typeof value === "number") return value;
    if (!value) return 0;
    var cleaned = String(value).replace(/[^0-9.]/g, "");
    var num = parseFloat(cleaned);
    return Number.isFinite(num) ? num : 0;
  }

  function getAllProducts() {
    if (!window.PRODUCTS_DATA) return [];
    return []
      .concat(PRODUCTS_DATA.hotDrops || [])
      .concat(PRODUCTS_DATA.womenProducts || [])
      .concat(PRODUCTS_DATA.menProducts || [])
      .concat(PRODUCTS_DATA.curveProducts || []);
  }

  function getProductById(id) {
    if (!id) return null;
    if (window.PRODUCTS_DATA && typeof PRODUCTS_DATA.findProductById === "function") {
      return PRODUCTS_DATA.findProductById(id);
    }

    var all = getAllProducts();
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id) return all[i];
    }
    return null;
  }

  function getCartFromStorage() {
    try {
      var raw = localStorage.getItem("showoff_cart") || "[]";
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function getDataLayerValue(path) {
    if (!Array.isArray(window.dataLayer)) return null;

    for (var i = window.dataLayer.length - 1; i >= 0; i--) {
      var obj = window.dataLayer[i];
      var current = obj;

      for (var j = 0; j < path.length; j++) {
        if (current && current[path[j]] !== undefined) {
          current = current[path[j]];
        } else {
          current = null;
          break;
        }
      }

      if (current !== null && current !== undefined) {
        return current;
      }
    }

    return null;
  }

  function waitForDataLayerValue(path, timeout, interval) {
    var maxTimeout = timeout || 3000;
    var pollInterval = interval || 80;

    return new Promise(function (resolve, reject) {
      var start = Date.now();

      function check() {
        var value = getDataLayerValue(path);
        if (value !== null && value !== undefined) {
          resolve(value);
          return;
        }

        if (Date.now() - start >= maxTimeout) {
          reject(new Error("Timeout waiting datalayer: " + path.join(".")));
          return;
        }

        setTimeout(check, pollInterval);
      }

      check();
    });
  }

  function waitForElement(selector, timeout, interval) {
    var maxTimeout = timeout || DEFAULT_WAIT_TIMEOUT;
    var pollInterval = interval || DEFAULT_WAIT_INTERVAL;

    return new Promise(function (resolve, reject) {
      var start = Date.now();

      function check() {
        try {
          var el = document.querySelector(selector);
          if (el) {
            resolve(el);
            return;
          }
        } catch (err) {
          // Ignore selector errors.
        }

        if (Date.now() - start >= maxTimeout) {
          reject(new Error("Timeout waiting for element: " + selector));
          return;
        }

        setTimeout(check, pollInterval);
      }

      check();
    });
  }

  function resolveSelectorWithFallback(selectors, timeout) {
    if (!selectors) return Promise.reject(new Error("No selector provided"));

    var list = Array.isArray(selectors) ? selectors : [selectors];
    var maxTimeout = timeout || DEFAULT_WAIT_TIMEOUT;

    return new Promise(function (resolve, reject) {
      var start = Date.now();

      function tryNext(index) {
        if (index >= list.length) {
          var fallback = list[0];
          waitForElement(fallback, Math.max(0, maxTimeout - (Date.now() - start)))
            .then(function () {
              resolve(fallback);
            })
            .catch(function () {
              reject(new Error("None of the selectors appeared: " + JSON.stringify(list)));
            });
          return;
        }

        var sel = list[index];
        try {
          if (document.querySelector(sel)) {
            resolve(sel);
            return;
          }
        } catch (err) {
          // Ignore bad selector and continue to next.
        }

        if (Date.now() - start >= maxTimeout) {
          reject(new Error("Timeout trying fallback selectors: " + JSON.stringify(list)));
          return;
        }

        setTimeout(function () {
          tryNext(index + 1);
        }, 60);
      }

      tryNext(0);
    });
  }

  function getCategoryFromPage() {
    var fileName = getFileName();
    var map = {
      "women.html": "Women",
      "men.html": "Men",
      "curve.html": "Curve",
      "top.html": "Top",
      "bestsellers.html": "Bestseller"
    };

    return map[fileName] || null;
  }

  function getCategoryDisplayName(category) {
    var names = {
      Women: "For Her",
      Men: "For Him",
      Curve: "Curve",
      Top: "Top Picks",
      Bestseller: "Best Seller"
    };
    return names[category] || category;
  }

  function toMcpItemFromCartItem(cartItem) {
    var product = getProductById(cartItem.productId);
    return {
      item_id: cartItem.productId || cartItem.id || "",
      item_name: cartItem.title || (product && product.title) || "",
      item_sku: cartItem.productId || cartItem.id || "",
      quantity: parseInt(cartItem.quantity, 10) || 1,
      price: parsePrice(cartItem.priceNum || (product && product.saleNum) || 0),
      size: cartItem.size || "",
      color: product && product.colors ? product.colors[0] : "",
      imageUrl: cartItem.image || (product && product.images && product.images[0]) || "",
      url: cartItem.productId ? (window.location.origin + "/product.html?id=" + cartItem.productId) : window.location.href,
      category: (product && product.category) || ""
    };
  }

  function buildBaseMcp() {
    var fileName = getFileName();
    var cart = getCartFromStorage();
    var mcp = {
      currency: "INR",
      items: cart.map(toMcpItemFromCartItem)
    };

    if (fileName === "index.html" || fileName === "") {
      mcp.pageName = "Home";
      mcp.pageType = "Home";
      return mcp;
    }

    if (fileName === "product.html") {
      var params = new URLSearchParams(window.location.search);
      var productId = params.get("id");
      var product = getProductById(productId);

      mcp.pageName = "Product";
      mcp.pageType = "Product";
      mcp.Item = product
        ? {
            id: product.id,
            sku: product.id,
            name: product.title,
            description: product.description || "",
            imageUrl: (product.images && product.images[0]) || "",
            url: window.location.href,
            price: parsePrice(product.saleNum || product.salePrice),
            availability: "in_stock",
            category: product.category || "",
            color: product.colors || [],
            size: product.sizes || []
          }
        : null;

      return mcp;
    }

    if (fileName === "cart.html") {
      mcp.pageName = "Cart";
      mcp.pageType = "Cart";
      return mcp;
    }

    if (fileName === "contact.html") {
      mcp.pageName = "Contact";
      mcp.pageType = "Contact";
      return mcp;
    }

    if (fileName === "wishlist.html") {
      mcp.pageName = "Wishlist";
      mcp.pageType = "Wishlist";
      return mcp;
    }

    if (fileName === "track-order.html") {
      mcp.pageName = "TrackOrder";
      mcp.pageType = "TrackOrder";
      return mcp;
    }

    var category = getCategoryFromPage();
    if (category) {
      mcp.pageName = "Category";
      mcp.pageType = "Category";
      mcp.itemListId = category;
      mcp.itemListName = getCategoryDisplayName(category);
      return mcp;
    }

    mcp.pageName = "Default";
    mcp.pageType = "Default";
    return mcp;
  }

  function pushMcpState(eventName, extraMcp) {
    var baseMcp = buildBaseMcp();
    var mergedMcp = Object.assign({}, baseMcp, extraMcp || {});
    window.dataLayer.push({
      event: eventName || "mcp_state",
      MCP: mergedMcp
    });
    return mergedMcp;
  }

  function syncCartFromStorage() {
    var cart = getCartFromStorage();
    pushMcpState("cart_sync", {
      items: cart.map(toMcpItemFromCartItem)
    });
  }

  function trackAddToCart(product, quantity, size) {
    if (!product || !product.id) return;

    var qty = parseInt(quantity, 10) || 1;
    var price = parsePrice(product.saleNum || product.price || product.salePrice);
    var lineItem = {
      item_id: product.id,
      item_name: product.title || "",
      item_sku: product.id,
      quantity: qty,
      price: price,
      size: size || "",
      color: (product.colors && product.colors[0]) || "",
      imageUrl: (product.images && product.images[0]) || "",
      url: window.location.origin + "/product.html?id=" + product.id,
      category: product.category || ""
    };

    var cartItems = getCartFromStorage().map(toMcpItemFromCartItem);

    pushMcpState("add_to_cart", {
      items: cartItems,
      addToCartItem: lineItem
    });
  }

  function trackCheckoutStarted(details) {
    pushMcpState("begin_checkout", {
      checkout: {
        firstName: (details && details.firstName) || "",
        phone: (details && details.phone) || "",
        addressLine1: (details && details.addressLine1) || "",
        city: (details && details.city) || "",
        stateProvince: (details && details.stateProvince) || "",
        postalCode: (details && details.postalCode) || ""
      }
    });
  }

  function trackContactSubmit(details) {
    pushMcpState("contact_submit", {
      contact: {
        fullName: (details && details.fullName) || "",
        email: (details && details.email) || "",
        phone: (details && details.phone) || "",
        subject: (details && details.subject) || ""
      }
    });
  }

  function getCartItemsForSfmc() {
    var items = getDataLayerValue(["MCP", "items"]) || [];
    var currency = getDataLayerValue(["MCP", "currency"]) || "INR";

    return items
      .map(function (item) {
        return {
          catalogObjectType: "Product",
          catalogObjectId: item.item_id || item.id || null,
          price: parseFloat(item.price) || 0,
          quantity: parseInt(item.quantity, 10) || 0,
          attributes: {
            sku: item.item_sku || item.id,
            name: item.item_name || item.name || "",
            currency: currency
          }
        };
      })
      .filter(function (item) {
        return !!item.catalogObjectId;
      });
  }

  function initSalesforceSitemap() {
    if (!window.SalesforceInteractions) {
      return;
    }

    SalesforceInteractions.init({
      cookieDomain: window.location.hostname
    }).then(function () {
      var sitemapConfig = {
        global: {
          contentZones: [
            { name: "global_header", selector: ["header.site-header", "header.navbar"] },
            { name: "global_footer", selector: ["footer.site-footer", "footer.footer"] },
            { name: "global_exit_intent" },
            { name: "global_survey_feedback" }
          ]
        },
        pageTypeDefault: {
          name: "default",
          interaction: { name: "Default Page" }
        },
        pageTypes: [
          {
            name: "home",
            isMatch: function () {
              return waitForDataLayerValue(["MCP", "pageName"], 2000, 80)
                .then(function (pageName) {
                  return pageName === "Home";
                })
                .catch(function () {
                  return false;
                });
            },
            interaction: {
              name: "Home Page"
            },
            listeners: [
              SalesforceInteractions.listener("load", window, function () {
                setTimeout(function () {
                  SalesforceInteractions.sendEvent({
                    interaction: {
                      name: "Page Engaged"
                    }
                  });
                }, 30000);
              })
            ],
            contentZones: [
              {
                name: "home_recommendation",
                selector: "#hot-drops-grid"
              },
              {
                name: "home_banner",
                selector: "#hero-slider-viewport"
              }
            ]
          },
          {
            name: "category",
            isMatch: function () {
              return waitForDataLayerValue(["MCP", "itemListId"], 2000, 80)
                .then(function (listId) {
                  return listId !== null && listId !== undefined;
                })
                .catch(function () {
                  return false;
                });
            },
            interaction: {
              name: SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
              catalogObject: {
                type: "Category",
                id: function () {
                  return getDataLayerValue(["MCP", "itemListId"]) || "unknown_category";
                },
                attributes: {
                  name: function () {
                    return getDataLayerValue(["MCP", "itemListName"]) || null;
                  },
                  url: SalesforceInteractions.resolvers.fromHref()
                }
              }
            },
            contentZones: [
              {
                name: "plp_recommendation",
                selector: function () {
                  return resolveSelectorWithFallback(["#shop-all-grid", ".product-grid", ".catalog-section"], 4000);
                }
              }
            ]
          },
          {
            name: "pdp",
            isMatch: function () {
              return waitForDataLayerValue(["MCP", "pageType"], 2000, 80)
                .then(function (pageType) {
                  return pageType === "Product";
                })
                .catch(function () {
                  return false;
                });
            },
            interaction: {
              name: SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
              catalogObject: {
                type: "Product",
                id: function () {
                  return getDataLayerValue(["MCP", "Item", "id"]);
                },
                attributes: {
                  sku: {
                    id: function () {
                      return getDataLayerValue(["MCP", "Item", "id"]);
                    }
                  },
                  name: function () {
                    return getDataLayerValue(["MCP", "Item", "name"]);
                  },
                  description: function () {
                    return getDataLayerValue(["MCP", "Item", "description"]);
                  },
                  imageUrl: function () {
                    var imageUrl = getDataLayerValue(["MCP", "Item", "imageUrl"]);
                    if (!imageUrl) return window.location.origin + "/default.jpg";
                    if (imageUrl.indexOf("http") === 0) return imageUrl;
                    return window.location.origin + imageUrl;
                  },
                  url: function () {
                    return getDataLayerValue(["MCP", "Item", "url"]);
                  },
                  currency: function () {
                    return getDataLayerValue(["MCP", "currency"]) || "INR";
                  },
                  inventoryCount: 1,
                  price: function () {
                    return getDataLayerValue(["MCP", "Item", "price"]) || 0;
                  },
                  availability: function () {
                    return getDataLayerValue(["MCP", "Item", "availability"]);
                  }
                },
                relatedCatalogObjects: {
                  Category: function () {
                    var category = getDataLayerValue(["MCP", "Item", "category"]);
                    return category ? [category] : [];
                  },
                  Color: function () {
                    var colors = getDataLayerValue(["MCP", "Item", "color"]);
                    return Array.isArray(colors) ? colors : colors ? [colors] : [];
                  },
                  Size: function () {
                    var sizes = getDataLayerValue(["MCP", "Item", "size"]);
                    return Array.isArray(sizes) ? sizes : sizes ? [sizes] : [];
                  }
                }
              }
            },
            contentZones: [
              {
                name: "pdp_recommendation",
                selector: "#pdp-similar-grid"
              }
            ],
            listeners: [
              SalesforceInteractions.listener("click", "#btn-pdp-add-bag", function () {
                var id = getDataLayerValue(["MCP", "Item", "id"]);
                var price = getDataLayerValue(["MCP", "Item", "price"]) || 0;
                var name = getDataLayerValue(["MCP", "Item", "name"]);
                if (!id) return;

                SalesforceInteractions.sendEvent({
                  interaction: {
                    name: SalesforceInteractions.CartInteractionName.AddToCart,
                    lineItem: {
                      catalogObjectType: "Product",
                      catalogObjectId: id,
                      quantity: 1,
                      price: price,
                      attributes: {
                        name: name,
                        sku: { id: id }
                      }
                    }
                  }
                });
              })
            ]
          },
          {
            name: "cart",
            isMatch: function () {
              return waitForDataLayerValue(["MCP", "pageType"], 2000, 80)
                .then(function (pageType) {
                  return pageType === "Cart";
                })
                .catch(function () {
                  return false;
                });
            },
            interaction: {
              name: SalesforceInteractions.CartInteractionName.ReplaceCart,
              lineItems: getCartItemsForSfmc
            }
          },
          {
            name: "contact",
            isMatch: function () {
              return waitForDataLayerValue(["MCP", "pageType"], 2000, 80)
                .then(function (pageType) {
                  return pageType === "Contact";
                })
                .catch(function () {
                  return false;
                });
            },
            interaction: {
              name: "Viewed Contact Us Page"
            },
            contentZones: [
              {
                name: "contact_us",
                selector: function () {
                  return resolveSelectorWithFallback(["#contact-form", ".contact-form-section", ".container"], 4000);
                }
              }
            ],
            listeners: [
              SalesforceInteractions.listener("submit", "#contact-form", function () {
                SalesforceInteractions.sendEvent({
                  interaction: {
                    name: "Contact Form Submitted"
                  }
                });
              })
            ]
          }
        ]
      };

      SalesforceInteractions.initSitemap(sitemapConfig);
    }).catch(function (err) {
      console.warn("SalesforceInteractions init failed:", err);
    });
  }

  function initPageDataLayerAndEvents() {
    pushMcpState("page_view");

    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target) return;

      var placeOrderBtn = target.closest("#btn-place-order");
      if (placeOrderBtn) {
        // Wait for cart-page validation logic and modal update to run first.
        setTimeout(function () {
          var successModal = document.getElementById("order-success-modal");
          if (successModal && successModal.style.display === "flex") {
            trackCheckoutStarted({
              firstName: (document.getElementById("cust-name") || {}).value || "",
              phone: (document.getElementById("cust-phone") || {}).value || "",
              addressLine1: (document.getElementById("cust-address") || {}).value || "",
              city: (document.getElementById("cust-city") || {}).value || "",
              stateProvince: "",
              postalCode: (document.getElementById("cust-pin") || {}).value || ""
            });
            syncCartFromStorage();
          }
        }, 0);
      }

      var pdpAddButton = target.closest("#btn-pdp-add-bag, #btn-pdp-buy-now");
      if (pdpAddButton) {
        // Defer until product page script updates localStorage cart.
        setTimeout(function () {
          var qtyEl = document.getElementById("pdp-qty-num");
          var qty = qtyEl ? parseInt(qtyEl.textContent, 10) || 1 : 1;
          var sizeEl = document.getElementById("pdp-selected-size-label");
          var selectedSize = sizeEl ? sizeEl.textContent.trim() : "M";
          var item = getDataLayerValue(["MCP", "Item"]);

          if (item && item.id) {
            trackAddToCart(
              {
                id: item.id,
                title: item.name,
                saleNum: item.price,
                images: [item.imageUrl],
                category: item.category,
                colors: item.color
              },
              qty,
              selectedSize
            );
            syncCartFromStorage();
          }
        }, 0);
      }
    });

    document.addEventListener("submit", function (event) {
      var form = event.target;
      if (!form || form.id !== "contact-form") return;

      // Track only after form submission handler succeeds.
      setTimeout(function () {
        var success = document.getElementById("contact-success-msg");
        if (success && success.style.display === "block") {
          trackContactSubmit({
            fullName: (document.getElementById("contact-name") || {}).value || "",
            email: (document.getElementById("contact-email") || {}).value || "",
            phone: (document.getElementById("contact-phone") || {}).value || "",
            subject: (document.getElementById("contact-subject") || {}).value || ""
          });
        }
      }, 0);
    });
  }

  window.showoffAnalytics = {
    pushMcpState: pushMcpState,
    syncCartFromStorage: syncCartFromStorage,
    trackAddToCart: trackAddToCart,
    trackCheckoutStarted: trackCheckoutStarted,
    trackContactSubmit: trackContactSubmit,
    getProductById: getProductById
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initPageDataLayerAndEvents();
      initSalesforceSitemap();
    });
  } else {
    initPageDataLayerAndEvents();
    initSalesforceSitemap();
  }
})();
