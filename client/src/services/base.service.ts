import { HttpRequest } from '@/lib/http-request';

class BaseService {
  httpRequest: HttpRequest;

  constructor(httpRequest: HttpRequest) {
    this.httpRequest = httpRequest;
  }
}

export default BaseService;
