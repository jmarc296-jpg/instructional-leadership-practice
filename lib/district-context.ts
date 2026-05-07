export const DEFAULT_DISTRICT_ID = "demo-district";

export function resolveDistrictId(request: Request): string {
  const fromHeader = request.headers.get("x-district-id")?.trim();
  if (fromHeader) return fromHeader;
  const fromQuery = new URL(request.url).searchParams.get("district_id")?.trim();
  return fromQuery || DEFAULT_DISTRICT_ID;
}

export function districtQueryParam(districtId: string = DEFAULT_DISTRICT_ID) {
  return `district_id=${encodeURIComponent(districtId)}`;
}
