import { expect } from "chai";
import { User, Address, Article } from "../entities";
import { Tson } from "../../src";

describe("Serialization Test", () => {

  let tson: Tson;

  before(() => {
    tson = new Tson();
  });

  it("should serialize Article object", () => {
    const address = new Address();
    address.addressLine1 = "Foo";
    address.addressLine2 = "Bar";
    address.zipCode = 12345;

    const user = new User();
    user.id = 1;
    user.firstName = "John";
    user.lastName = "Doe";
    user.addresses = [address];

    const article = new Article();
    article.id = 1;
    article.title = "Foo";
    article.content = "Bar";
    article.author = user;
    article.publishedAt = new Date(0);

    const json1 = tson.toJson(article);
    expect(json1).to.be.instanceOf(Object);

    let keys: string[];

    keys = Object.keys(json1);
    expect(keys).to.contain("id");
    expect(keys).to.contain("title");
    expect(keys).to.contain("content");
    expect(keys).to.contain("user");
    expect(keys).to.contain("published_at");

    expect(json1.id).to.equal(1);
    expect(json1.title).to.equal("Foo");
    expect(json1.content).to.equal("Bar");
    expect(json1.user).to.be.instanceOf(Object);
    expect(json1.published_at.getTime()).to.equal(0);

    const json2 = json1.user;
    keys = Object.keys(json2);
    expect(keys).to.contain("id");
    expect(keys).to.contain("first_name");
    expect(keys).to.contain("last_name");
    expect(keys).to.contain("addresses");

    expect(json2.id).to.equal(1);
    expect(json2.first_name).to.equal("John");
    expect(json2.last_name).to.equal("Doe");
    expect(json2.addresses).to.be.instanceOf(Array);

    const json3 = json2.addresses[0];
    keys = Object.keys(json3);
    expect(keys).to.contain("address_line1");
    expect(keys).to.contain("address_line2");
    expect(keys).to.contain("zip_code");

    expect(json3.address_line1).to.equal("Foo");
    expect(json3.address_line2).to.equal("Bar");
    expect(json3.zip_code).to.equal(12345);
  });

  it("should set null property to undefined when serializing", () => {
    const address = new Address();
    address.addressLine1 = "Foo";
    address.addressLine2 = "Bar";

    const json = tson.toJson(address);
    const keys = Object.keys(json);
    expect(keys).to.include("address_line1");
    expect(keys).to.include("address_line2");
    expect(keys).to.not.include("zip_code");

    console.log(json);
  });

});
