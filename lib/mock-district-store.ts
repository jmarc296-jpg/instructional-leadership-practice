export let districtStore: any[] = [];

export function updateDistrictStore(data: any[]) {
  districtStore = data;
}

export function getDistrictStore() {
  return districtStore;
}
