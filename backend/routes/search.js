const express = require("express");
const router = express.Router();
const db = require("../data/db.json");

/**
 * GET /api/search
 * Query Params:
 *   - search_query: string (e.g. "Lipid Profile")
 *   - pincode: string (e.g. "110001")
 *
 * Logic:
 *  1. Filter by pincode (check available_pincodes array)
 *  2. Match search_query against item_name OR included_tests array (case-insensitive)
 *  3. Sort by total final price = offer_price + home_collection_fee (ascending)
 */
router.get("/", (req, res) => {
  const { search_query, pincode } = req.query;

  // Validate inputs
  if (!search_query || !pincode) {
    return res.status(400).json({
      success: false,
      message: "Both 'search_query' and 'pincode' parameters are required.",
    });
  }

  const queryLower = search_query.trim().toLowerCase();
  const pincodeStr = pincode.trim();

  // Step 1 & 2: Filter by pincode AND match by search query
  const filtered = db.filter((item) => {
    // Pincode check
    const servicesPin = item.available_pincodes.includes(pincodeStr);
    if (!servicesPin) return false;

    // Search match: check item_name
    const nameMatch = item.item_name.toLowerCase().includes(queryLower);

    // Search match: check any included_test name
    const testMatch = item.included_tests.some((test) =>
      test.toLowerCase().includes(queryLower)
    );

    return nameMatch || testMatch;
  });

  // Step 3: Compute total final price and sort ascending
  const results = filtered
    .map((item) => {
      const totalFinalPrice =
        item.pricing.offer_price + item.logistics.home_collection_fee;
      return { ...item, totalFinalPrice };
    })
    .sort((a, b) => a.totalFinalPrice - b.totalFinalPrice);

  return res.json({
    success: true,
    count: results.length,
    query: { search_query, pincode },
    results,
  });
});

module.exports = router;
