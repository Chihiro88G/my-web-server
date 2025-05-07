
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  // not calling the function. returning the reference to the function
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.triger;
  }

  get get() {
    return this.attributes.get;
  }
}