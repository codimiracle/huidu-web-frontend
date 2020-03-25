import { API } from "../configs/api-config";
import ApiUtil from "./api-util";

interface ReferenceData {
  referenceId: string;
  fileName: string;
  fileOriginalName: string;
  fileSize: number;
  type: string;
  uploadedDate: string;
  status: number;
  userId: number;
}

export default class UploadUtil {
  static relativeUrl(referenceData: ReferenceData) {
    return "reference-data:" + referenceData.referenceId;
  }
  static absoluteUrlByReferenceId(api: API, referenceId: string) {
    let apiDefinition = ApiUtil.findApiDefinition(api);
    if (!api || !referenceId) {
      return '/assets/empty.png';
    }
    return apiDefinition.url + "/" + referenceId;
  }
  static absoluteUrlByRelativeUrl(relativeUrl: string) {
    if (!relativeUrl) {
      return '/assets/empty.png';
    }
    if (relativeUrl.startsWith('http') || relativeUrl.startsWith('/') || relativeUrl.startsWith('.')) {
      return relativeUrl;
    }
    return ApiUtil.getOrigin() + "/" + relativeUrl;
  }
  static absoluteUrl(api: API, resref: any) {
    if (typeof resref == 'string') {
      if (resref.startsWith('reference-data:')) {
        return this.absoluteUrlByReferenceId(api, resref.substr('reference-data:'.length));
      }
    }
    return this.absoluteUrlByRelativeUrl(resref);
  }
}