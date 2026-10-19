/*** Salesforce Personalization Sitemap
 * Migrated from MCP Sitemap on: 2026-09-07
 * 
 * CONVERSION NOTES:
 * - 4 items require manual configuration (search for "TODO:")
 * - Polyfills included for removed SDK functions
 * - Review eventType values match your Web Schema
 * - Configure Web Personalization Manager (WPM) experiences via the UI
 * 
 * DATA CLOUD REQUIREMENTS:
 * - Create Web Schema with eventType objects matching this sitemap
 * - Configure identity resolution for profile unification
 * - Map data streams to appropriate DMOs*/
/* Web Personalization Manager config: flicker defense + web templates (transformers) */
SalesforceInteractions.Personalization.Config.initialize({
  // Flicker defense prevents content flash during personalization load
  customFlickerDefenseConfig: {
    redisplayTimeoutMilliseconds: 2000,
    renderPersonalizationAfterTimeoutElapsed: true
  },
  // Web templates for rendering personalization responses
  additionalTransformers: [
    {
      name: "WelcomeOverlay",
      transformerType: "handlebars",
      transformer: `
<style>
.sfdcep-overlay {
    background-color: rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 256;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sfdcep-overlay-banner {
    padding: 20px;
    width: 90%;
    height: 90%;
    max-width: 500px !important;
    max-height: 500px !important;
    background-size: cover;
    background-color: #333333;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif;
}

.sfdcep-overlay-header {
    font-size: 32px;
    padding-bottom: 40px;
    font-weight: 600;
    color: #DDDDDD;
    text-align: center;
}

.sfdcep-overlay-subheader {
    font-size: 20px;
    font-weight: 400;
    color: #DDDDDD;
    text-align: center;
    padding-bottom: 40px;
}

.sfdcep-overlay-cta {
    text-align: center;
}

.sfdcep-overlay-cta a {
    padding: 10px 20px;
    display: inline-block;
    background-color: #097fb3;
    border-radius: 20px;
    color: #DDDDDD;
    text-decoration: none;
    font-weight: 400;
    font-size: 18px;
}
</style>

<div class="sfdcep-overlay sfdcep-welcome-first" onclick="this.remove()">
    <div class="sfdcep-overlay-banner" style="background-image: url('{{subVar 'BackgroundImageUrl'}}')">
        <div class="sfdcep-overlay-header">{{subVar 'Header'}}</div>
        <div class="sfdcep-overlay-subheader">{{subVar 'Subheader'}}</div>
        <div class="sfdcep-overlay-cta">
            <a href="{{subVar 'CallToActionUrl'}}">{{subVar 'CallToActionText'}}</a>
        </div>
    </div>
</div>`,
      substitutions: {
        BackgroundImageUrl: { defaultValue: "" },
        Header: { defaultValue: "Welcome to SHOWOFFFF!" },
        Subheader: { defaultValue: "Discover the latest drops and trending styles, picked just for you." },
        CallToActionUrl: { defaultValue: "/" },
        CallToActionText: { defaultValue: "Shop Now" }
      }
    }
  ],
  // Custom engagement destinations for tracking
  customEngagementConfig: [
    // Add custom engagement tracking configurations here
  ]
});
;
/**
 * SALESFORCE MARKETING CLOUD PERSONALIZATION (MCP / EVERGAGE) SITEMAP
 */
// Dataspace used by Web Personalization Manager (must match the dataspace API name of your personalization points).
// Test value: "default". Switch to "ShowOff_Demo" once WPM lists points correctly.
var SF_DATASPACE = "default";

/*
 * SHOWOFFFF visitor popup routing:
 * - First visit: allow .sfdcep-welcome-first and mark the browser as having seen it.
 * - Returning visits: suppress .sfdcep-welcome-first and allow .sfdcep-welcome-back.
 * - The visit status is snapshotted once per page load, so Welcome Back cannot appear
 *   on the same first visit after the first popup sets localStorage.
 * Both templates must include their unique marker class on the outer overlay.
 */
(function () {
  "use strict";

  var storageKey = "showoff_welcome_popup_seen_v1";
  var hadSeenWelcomeBeforeThisPage = false;

  try {
    hadSeenWelcomeBeforeThisPage = window.localStorage.getItem(storageKey) === "true";
  } catch (error) {
    // Storage unavailable: default to first-visit behavior without breaking the page.
  }

  function handlePopup(root) {
    if (!root || root.nodeType !== 1) return;

    var popups = [];
    if (root.matches && root.matches(".sfdcep-welcome-first, .sfdcep-welcome-back")) {
      popups.push(root);
    }
    if (root.querySelectorAll) {
      var nestedPopups = root.querySelectorAll(".sfdcep-welcome-first, .sfdcep-welcome-back");
      for (var i = 0; i < nestedPopups.length; i++) popups.push(nestedPopups[i]);
    }

    popups.forEach(function (popup) {
      var isFirstWelcome = popup.classList.contains("sfdcep-welcome-first");
      var isWelcomeBack = popup.classList.contains("sfdcep-welcome-back");

      if (isFirstWelcome) {
        if (hadSeenWelcomeBeforeThisPage) {
          popup.remove();
        } else {
          try {
            window.localStorage.setItem(storageKey, "true");
          } catch (error) {
            // Leave the first-visit popup visible if browser storage is unavailable.
          }
        }
      } else if (isWelcomeBack && !hadSeenWelcomeBeforeThisPage) {
        popup.remove();
      }
    });
  }

  function startPopupGuard() {
    if (!document.documentElement) return;

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          handlePopup(node);
        });
      });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    handlePopup(document.documentElement);
  }

  if (document.documentElement) {
    startPopupGuard();
  } else {
    document.addEventListener("DOMContentLoaded", startPopupGuard, { once: true });
  }
})();

SalesforceInteractions.init({
  cookieDomain: window.location.hostname || undefined,

  personalization: {
    dataspace: SF_DATASPACE,
    wpm: {
      enabled: true
    },
    flickerDefense: {
      enabled: true,
      selector: "body",
      timeoutMs: 3000
    }
  },

  consents: new Promise(resolve => {
    resolve([{
      provider: "Consent Provider",
      purpose: SalesforceInteractions.ConsentPurpose.Tracking,
      status: SalesforceInteractions.ConsentStatus.OptIn
    }]);
  })
}).then(function () {
  "use strict";

  // Helper to read from window.dataLayer
  function getDataLayerValue(path) {
    if (!window.dataLayer || !Array.isArray(window.dataLayer)) return null;
    for (var i = window.dataLayer.length - 1; i >= 0; i--) {
      var obj = window.dataLayer[i];
      if (!obj || typeof obj !== "object") continue;
      var current = obj;
      var found = true;
      for (var j = 0; j < path.length; j++) {
        if (current && current[path[j]] !== undefined) {
          current = current[path[j]];
        } else {
          found = false;
          break;
        }
      }
      if (found && current !== null && current !== undefined) {
        return current;
      }
    }
    return null;
  }
  function parsePrice(value) {
    if (typeof value === "number") return value;
    if (!value) return 0;
    var cleaned = String(value).replace(/[^0-9.]/g, "");
    var num = parseFloat(cleaned);
    return Number.isFinite(num) ? num : 0;
  }

  // Active User Profile & Identity Resolver for Salesforce MCP
  function getUserResolver() {
    var uId = getDataLayerValue(["MCP", "user", "id"]);
    var storedUser = null;
    try {
      storedUser = JSON.parse(localStorage.getItem("showoff_user") || "{}");
    } catch (e) {}
    var phone = storedUser && storedUser.phone || getDataLayerValue(["MCP", "user", "attributes", "phone"]) || getDataLayerValue(["user", "phone"]) || (uId && uId !== "anonymous" ? uId : null);
    var isLoggedIn = storedUser && storedUser.isLoggedIn || getDataLayerValue(["MCP", "user", "attributes", "isLoggedIn"]) === true || getDataLayerValue(["user", "isLoggedIn"]) === true;
    if (isLoggedIn && phone) {
      return {
        id: phone,
        attributes: {
          phone: phone,
          isLoggedIn: true
        }
      };
    }
    return undefined;
  }

  // Fallback catalog resolver
  function getProductFallback() {
    var params = new URLSearchParams(window.location.search);
    var productId = params.get("id") || "prod_drop_1";
    if (window.PRODUCTS_DATA) {
      if (typeof window.PRODUCTS_DATA.findProductById === "function") {
        var p = window.PRODUCTS_DATA.findProductById(productId);
        if (p) return p;
      }
      var all = [].concat(window.PRODUCTS_DATA.hotDrops || []).concat(window.PRODUCTS_DATA.womenProducts || []).concat(window.PRODUCTS_DATA.menProducts || []).concat(window.PRODUCTS_DATA.curveProducts || []);
      for (var i = 0; i < all.length; i++) {
        if (all[i].id === productId) return all[i];
      }
    }
    return null;
  }
  function getCartLineItems() {
    var items = getDataLayerValue(["MCP", "items"]);
    var currency = getDataLayerValue(["MCP", "currency"]) || "INR";
    if (Array.isArray(items) && items.length > 0) {
      return items.map(function (item) {
        return {
          catalogObjectType: "Product",
          catalogObjectId: item.item_id || item.item_sku || item.id,
          price: parsePrice(item.price),
          quantity: parseInt(item.quantity, 10) || 1,
          attributes: {
            sku: item.item_sku || item.item_id || item.id,
            name: item.item_name || item.title || "",
            currency: currency
          }
        };
      }).filter(function (item) {
        return !!item.catalogObjectId;
      });
    }
    try {
      var raw = localStorage.getItem("showoff_cart") || "[]";
      var parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map(function (item) {
          return {
            catalogObjectType: "Product",
            catalogObjectId: item.productId || item.cartItemId || item.id,
            price: parsePrice(item.priceNum || item.saleNum || 0),
            quantity: parseInt(item.quantity, 10) || 1,
            attributes: {
              sku: item.productId || item.cartItemId || item.id,
              name: item.title || "",
              currency: currency
            }
          };
        }).filter(function (item) {
          return !!item.catalogObjectId;
        });
      }
    } catch (e) {}
    return [];
  }
  var sitemapConfig = {
    global: {
      user: getUserResolver,
      contentZones: [{
        name: "global_header",
        selector: "header.site-header"
      }, {
        name: "global_footer",
        selector: "footer.site-footer"
      }, {
        name: "global_exit_intent",
        /* TODO: Add CSS selector - REQUIRED for SP */selector: ""
      }, {
        name: "global_survey_feedback",
        /* TODO: Add CSS selector - REQUIRED for SP */selector: ""
      }],
      listeners: [
      // 1. Capture Login Event when user logs in via KwikPass
      SalesforceInteractions.listener("click", "#kp-btn-verify-otp", function () {
        setTimeout(function () {
          var user = getUserResolver();
          if (user) {
            SalesforceInteractions.sendEvent({
              interaction: {
                name: "User Logged In",
                eventType: "userEngagement"
              },
              user: user
            });
          }
        }, 300);
      }),
      // 2. Capture Logout Event
      SalesforceInteractions.listener("click", "#btn-dropdown-logout", function () {
        SalesforceInteractions.sendEvent({
          interaction: {
            name: "User Logged Out",
            eventType: "userEngagement"
          },
          user: {
            id: "anonymous",
            attributes: {
              eventType: "identity",
              isLoggedIn: false
            }
          }
        });
      })]
    },
    pageTypeDefault: {
      name: "default",
      interaction: {
        name: "Default Page"
      }
    },
    pageTypes: [
    // 1. HOME PAGE
    {
      name: "home",
      isMatch: function () {
        var pageType = getDataLayerValue(["MCP", "pageType"]);
        if (pageType === "Home") return true;
        var path = (window.location.pathname || "").toLowerCase();
        return path === "/" || path === "" || path.endsWith("/index.html") || path.endsWith("/index");
      },
      interaction: {
        name: "Home Page",
        eventType: "userEngagement"
      },
      contentZones: [{
        name: "home_hero_banner",
        selector: "#hero-slider-viewport"
      }, {
        name: "home_hot_drops_recommendation",
        selector: "#hot-drops-grid"
      }, {
        name: "home_bestsellers_recommendation",
        selector: "#bestsellers-tiles-grid"
      }, {
        name: "home_top_strip_banner",
        selector: "#welcome-zone"
      }, {
        name: "home_category_tiles",
        /* TODO: Add CSS selector - REQUIRED for SP */selector: ""
      }, {
        name: "home_mid_page_promo",
        /* TODO: Add CSS selector - REQUIRED for SP */selector: ""
      }, {
        name: "home_newsletter_signup",
        /* TODO: Add CSS selector - REQUIRED for SP */selector: ""
      }]
    },
    // 2. CATEGORY (PLP) PAGE
    {
      name: "category",
      isMatch: function () {
        var pageType = getDataLayerValue(["MCP", "pageType"]);
        if (pageType === "Category") return true;
        var path = (window.location.pathname || "").toLowerCase();
        return path.indexOf("women.html") !== -1 || path.indexOf("men.html") !== -1 || path.indexOf("curve.html") !== -1 || path.indexOf("top.html") !== -1 || path.indexOf("bestsellers.html") !== -1 || document.body && document.body.hasAttribute("data-page-gender") || !!document.getElementById("shop-all-grid");
      },
      interaction: {
        name: "View Category",
        type: "Category",
        id: function () {
          return getDataLayerValue(["MCP", "itemListId"]) || document.body && document.body.getAttribute("data-page-gender") || "Category";
        },
        attributes: {
          name: function () {
            return getDataLayerValue(["MCP", "itemListName"]) || getDataLayerValue(["MCP", "itemListId"]) || "Category";
          },
          url: SalesforceInteractions.resolvers.fromHref()
        },
        eventType: "ProductCategoryEngagement"
      },
      contentZones: [{
        name: "category_hero_banner",
        selector: ".category-hero-banner"
      }, {
        name: "plp_recommendations",
        selector: "#shop-all-grid"
      }]
    },
    // 3. PRODUCT DETAIL PAGE (PDP)
    {
      name: "pdp",
      isMatch: function () {
        var pageType = getDataLayerValue(["MCP", "pageType"]);
        if (pageType === "Product") return true;
        var path = (window.location.pathname || "").toLowerCase();
        return path.indexOf("product.html") !== -1 || !!document.getElementById("pdp-title");
      },
      interaction: {
        name: SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
        catalogObject: {
          type: "Product",
          id: function () {
            var mcpId = getDataLayerValue(["MCP", "Item", "id"]);
            if (mcpId) return mcpId;
            var prod = getProductFallback();
            if (prod && prod.id) return prod.id;
            var params = new URLSearchParams(window.location.search);
            return params.get("id") || "prod_drop_1";
          },
          attributes: {
            sku: function () {
              var sku = getDataLayerValue(["MCP", "Item", "sku"]) || getDataLayerValue(["MCP", "Item", "id"]);
              if (sku) return sku;
              var prod = getProductFallback();
              if (prod && prod.id) return prod.id;
              var params = new URLSearchParams(window.location.search);
              return params.get("id") || "prod_drop_1";
            },
            name: function () {
              var mcpName = getDataLayerValue(["MCP", "Item", "name"]);
              if (mcpName) return mcpName;
              var prod = getProductFallback();
              if (prod && prod.title) return prod.title;
              var titleEl = document.getElementById("pdp-title");
              return titleEl ? titleEl.textContent.trim() : "";
            },
            description: function () {
              var desc = getDataLayerValue(["MCP", "Item", "description"]);
              if (desc) return desc;
              var prod = getProductFallback();
              if (prod && prod.description) return prod.description;
              var descEl = document.getElementById("pdp-desc-text");
              return descEl ? descEl.textContent.trim() : "";
            },
            imageUrl: function () {
              var img = getDataLayerValue(["MCP", "Item", "imageUrl"]);
              if (img) return img;
              var prod = getProductFallback();
              if (prod && prod.images && prod.images[0]) return prod.images[0];
              var mainImg = document.getElementById("pdp-main-image");
              if (mainImg && mainImg.src) return mainImg.src;
              return window.location.origin + "/assets/placeholder.jpg";
            },
            url: SalesforceInteractions.resolvers.fromHref(),
            currency: function () {
              return getDataLayerValue(["MCP", "currency"]) || "INR";
            },
            price: function () {
              var price = getDataLayerValue(["MCP", "Item", "price"]);
              if (price !== null && price !== undefined && price !== 0) return parsePrice(price);
              var prod = getProductFallback();
              if (prod && (prod.saleNum || prod.salePrice)) return parsePrice(prod.saleNum || prod.salePrice);
              var priceEl = document.getElementById("pdp-sale-price");
              return priceEl ? parsePrice(priceEl.textContent) : 0;
            },
            availability: function () {
              return getDataLayerValue(["MCP", "Item", "availability"]) || "in_stock";
            }
          },
          relatedCatalogObjects: {
            Category: function () {
              var cat = getDataLayerValue(["MCP", "Item", "category"]);
              if (cat) return [cat];
              var prod = getProductFallback();
              return prod && prod.category ? [prod.category] : [];
            },
            Color: function () {
              var col = getDataLayerValue(["MCP", "Item", "color"]);
              if (col && Array.isArray(col) && col.length > 0) return col;
              if (col && typeof col === "string") return [col];
              var prod = getProductFallback();
              return prod && prod.colors ? Array.isArray(prod.colors) ? prod.colors : [prod.colors] : [];
            },
            Size: function () {
              var s = getDataLayerValue(["MCP", "Item", "size"]);
              if (s && Array.isArray(s) && s.length > 0) return s;
              if (s && typeof s === "string") return [s];
              var prod = getProductFallback();
              return prod && prod.sizes ? Array.isArray(prod.sizes) ? prod.sizes : [prod.sizes] : [];
            }
          }
        }
      },
      contentZones: [{
        name: "pdp_similar_recommendations",
        selector: "#pdp-similar-grid"
      }],
      listeners: [SalesforceInteractions.listener("click", "#btn-pdp-add-bag", function () {
        var prod = getProductFallback();
        var id = getDataLayerValue(["MCP", "Item", "id"]) || prod && prod.id || new URLSearchParams(window.location.search).get("id") || "prod_drop_1";
        var price = parsePrice(getDataLayerValue(["MCP", "Item", "price"])) || prod && parsePrice(prod.saleNum || prod.salePrice) || 999;
        var name = getDataLayerValue(["MCP", "Item", "name"]) || prod && prod.title || (document.getElementById("pdp-title") ? document.getElementById("pdp-title").textContent.trim() : "");
        var qtyEl = document.getElementById("pdp-qty-num");
        var qty = qtyEl ? parseInt(qtyEl.textContent, 10) || 1 : 1;
        SalesforceInteractions.sendEvent({
          interaction: {
            name: SalesforceInteractions.CartInteractionName.AddToCart,
            lineItem: {
              catalogObjectType: "Product",
              catalogObjectId: id,
              quantity: qty,
              price: price,
              attributes: {
                name: name,
                sku: id
              }
            }
          }
        });
      })]
    },
    // 4. CART & CHECKOUT PAGE
    {
      name: "cart",
      isMatch: function () {
        var pageType = getDataLayerValue(["MCP", "pageType"]);
        if (pageType === "Cart") return true;
        var path = (window.location.pathname || "").toLowerCase();
        return path.indexOf("cart.html") !== -1 || !!document.getElementById("full-cart-layout");
      },
      interaction: {
        name: SalesforceInteractions.CartInteractionName.ReplaceCart,
        lineItems: getCartLineItems
      },
      contentZones: [{
        name: "cart_recommendations",
        selector: "#cart-recommendations-grid"
      }]
    },
    // 5. WISHLIST PAGE
    {
      name: "wishlist",
      isMatch: function () {
        var pageType = getDataLayerValue(["MCP", "pageType"]);
        if (pageType === "Wishlist") return true;
        var path = (window.location.pathname || "").toLowerCase();
        return path.indexOf("wishlist.html") !== -1 || !!document.getElementById("page-wishlist-grid");
      },
      interaction: {
        name: "Viewed Wishlist Page",
        eventType: "userEngagement"
      },
      contentZones: [{
        name: "wishlist_grid",
        selector: "#page-wishlist-grid"
      }]
    },
    // 6. CONTACT US PAGE
    {
      name: "contact",
      isMatch: function () {
        var pageType = getDataLayerValue(["MCP", "pageType"]);
        if (pageType === "Contact") return true;
        var path = (window.location.pathname || "").toLowerCase();
        return path.indexOf("contact.html") !== -1 || !!document.getElementById("contact-form");
      },
      interaction: {
        name: "Viewed Contact Us Page",
        eventType: "userEngagement"
      },
      contentZones: [{
        name: "contact_us_form",
        selector: "#contact-form"
      }],
      listeners: [SalesforceInteractions.listener("submit", "#contact-form", function () {
        SalesforceInteractions.sendEvent({
          interaction: {
            name: "Contact Form Submitted",
            eventType: "userEngagement"
          }
        });
      })]
    },
    // 7. TRACK ORDER PAGE
    {
      name: "track_order",
      isMatch: function () {
        var pageType = getDataLayerValue(["MCP", "pageType"]);
        if (pageType === "TrackOrder") return true;
        var path = (window.location.pathname || "").toLowerCase();
        return path.indexOf("track-order.html") !== -1 || !!document.getElementById("track-form");
      },
      interaction: {
        name: "Viewed Track Order Page",
        eventType: "userEngagement"
      }
    },
    // 8. CONTENT & POLICY PAGES
    {
      name: "content",
      isMatch: function () {
        var pageType = getDataLayerValue(["MCP", "pageType"]);
        if (pageType === "Content") return true;
        var path = (window.location.pathname || "").toLowerCase();
        return path.indexOf("about.html") !== -1 || path.indexOf("returns.html") !== -1 || path.indexOf("shipping-policy.html") !== -1 || path.indexOf("faqs.html") !== -1;
      },
      interaction: {
        name: "Viewed Policy/Content Page",
        eventType: "userEngagement"
      }
    }]
  };
  // Container for the welcome popup content zone (popup itself is position:fixed, so no layout impact).
  // Guarded: document.body can be null if this runs while the page is still parsing.
  function ensureWelcomeZone() {
    if (!document.body || document.getElementById("welcome-zone")) return;
    var welcomeZone = document.createElement("div");
    welcomeZone.id = "welcome-zone";
    document.body.insertBefore(welcomeZone, document.body.firstChild);
  }
  ensureWelcomeZone();
  if (!document.body) {
    document.addEventListener("DOMContentLoaded", ensureWelcomeZone);
  }

  SalesforceInteractions.initSitemap(sitemapConfig);
});