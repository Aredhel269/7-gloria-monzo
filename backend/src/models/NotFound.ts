import { MESSAGES } from '../helpers/helper';
import { Response } from './Response';

export default class NotFound extends Response {
  constructor () {
    super();
    this.setStatus(false);
    this.addMessage(MESSAGES.NOTFOUND);
    this.addError(MESSAGES.ERROR404);
  }
}
