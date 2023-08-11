import { NextResponse } from 'next/server';

// Define conversion factors for different length units
let units = {
  length: {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
  },
};

// Create a cache to store conversion results
let cache = new Map<string, number>();

// Function to calculate and cache unit conversion
function getConversion(key, value, src, dest) {
  let isCached = cache.has(key);

  if (isCached) {
    return cache.get(key);
  }

  let srcFactor = units.length[src];
  let destFactor = units.length[dest];

  let conversion = Number(((value * srcFactor) / destFactor).toFixed(4));

  cache.set(key, conversion);
  return conversion;
}

export async function POST(request: Request) {
  let body = await request.json();
  let cacheKey = JSON.stringify(body);

  const { frmVal, frmUn, toVal, toUn } = body;

  // Calculate conversions and prepare the response
  const res = {
    fromUnitVal: frmVal || getConversion(cacheKey, toVal, toUn, frmUn),
    fromUnit: frmUn,
    toUnitVal: frmVal ? getConversion(cacheKey, frmVal, frmUn, toUn) : toVal,
    toUnit: toUn,
  };

  // Return a JSON response with appropriate headers and status code
  return NextResponse.json(res, {
    status: 200,
    statusText: 'Success',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
