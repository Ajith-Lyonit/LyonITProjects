export type RootStackParamList = {
  // Tabs container
  tabs: undefined;

  // Tab screens
  dashboard: undefined;
  planning: undefined;
  rmplanning: undefined;
  production: undefined;

  // Deep screens
  jobdetail: { docNo: string; date: string };
  jobcard: undefined;
  labelprinting: undefined;
  fgtransfer: undefined;
  sterile: undefined;
  steriledocument: { docNo: string };
  transferdocument: { docNo: string };
  bom: undefined;
  createuser:undefined;
  barcode: undefined;
};