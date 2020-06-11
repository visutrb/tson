import { expect } from "chai";
import { Tson } from "../../src";
import { Address, User, Article } from "../entities";

describe("Deserialization Test", () => {

  let tson: Tson;

  before(() => {
    tson = new Tson();
  });

  it("should return null if json string or json object is null", () => {
    let address: any 
    
    address = tson.fromJson(null, Address);
    expect(address).to.be.null;

    address = tson.fromJson("null", Address);
    expect(address).to.be.null;

    address = tson.fromJson("", Address);
    expect(address).to.be.null;
  });

  it("should construct instace of Address class from json string", () => {
    const json = "{ \"address_line1\": \"Foo\", \"address_line2\": \"Bar\", \"zip_code\": 12345 }";

    const address = tson.fromJson(json, Address);
    expect(address).to.be.instanceOf(Address);

    const keys = Object.keys(address);
    expect(keys).to.contain("addressLine1");
    expect(keys).to.contain("addressLine2");
    expect(keys).to.contain("zipCode");

    expect(address.addressLine1).to.equal("Foo");
    expect(address.addressLine2).to.equal("Bar");
    expect(address.zipCode).to.equal(12345);
  });

  it("should construct instance of Address class", () => {
    const json = { address_line1: "Foo", address_line2: "Bar", zip_code: 12345, strings: ["foo", "bar"] };

    const address = tson.fromJson(json, Address);
    expect(address).to.be.instanceOf(Address);

    const keys = Object.keys(address);
    expect(keys).to.contain("addressLine1");
    expect(keys).to.contain("addressLine2");
    expect(keys).to.contain("zipCode");

    expect(address.addressLine1).to.equal("Foo");
    expect(address.addressLine2).to.equal("Bar");
    expect(address.zipCode).to.equal(12345);
  });

  it("should construct instance of User class", () => {
    const json = { id: 1, first_name: "John", last_name: "Doe" };

    const user = tson.fromJson(json, User);
    expect(user).to.be.instanceOf(User);

    const keys = Object.keys(user);
    expect(keys).to.contain("id");
    expect(keys).to.contain("firstName");
    expect(keys).to.contain("lastName");
    expect(keys).to.contain("addresses");

    expect(user.id).to.equal(1);
    expect(user.firstName).to.equal("John");
    expect(user.lastName).to.equal("Doe");
    expect(user.addresses).to.be.null;
  });

  it("should construct instance of User class with addresses", () => {
    const json = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      addresses: [
        {
          address_line1: "Foo",
          address_line2: "Bar",
          zip_code: 12345
        }
      ]
    };

    const user = tson.fromJson(json, User);
    expect(user).to.be.instanceOf(User);

    let keys: string[]

    keys = Object.keys(user);
    expect(keys).to.contain("id");
    expect(keys).to.contain("firstName");
    expect(keys).to.contain("lastName");
    expect(keys).to.contain("addresses");

    expect(user.id).to.equal(1);
    expect(user.firstName).to.equal("John");
    expect(user.lastName).to.equal("Doe");
    expect(user.addresses).to.be.instanceOf(Array);

    const address = user.addresses[0];
    expect(address).to.be.instanceOf(Address);

    keys = Object.keys(address);
    expect(keys).to.contain("addressLine1");
    expect(keys).to.contain("addressLine2");
    expect(keys).to.contain("zipCode");

    expect(address.addressLine1).to.equal("Foo");
    expect(address.addressLine2).to.equal("Bar");
    expect(address.zipCode).to.equal(12345);
  });

  it("should construct instance of Article class", () => {
    const json = { id: 1, title: "Foo", content: "Bar", published_at: "1970-01-01T00:00:00.000Z", strings: ["foo", "bar"] };

    const article = tson.fromJson(json, Article);
    expect(article).to.be.instanceOf(Article);

    const keys = Object.keys(article);
    expect(keys).to.contain("id");
    expect(keys).to.contain("title");
    expect(keys).to.contain("content");
    expect(keys).to.contain("author");
    expect(keys).to.contain("publishedAt");

    expect(article.id).to.equal(1);
    expect(article.title).to.equal("Foo");
    expect(article.content).to.equal("Bar");
    expect(article.author).to.be.null;
    expect(article.publishedAt.getTime()).to.equal(0);

    expect(article.randomStrings).to.contain("foo");
    expect(article.randomStrings).to.contain("bar");
  });

  it("should construct instance of Article class with author property", () => {
    const json = {
      id: 1,
      title: "Foo",
      content: "Bar",
      published_at: "1970-01-01T00:00:00.000Z",
      user: {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        addresses: [
          {
            address_line1: "Foo",
            address_line2: "Bar",
            zip_code: 12345
          }
        ]
      }
    };

    const article = tson.fromJson(json, Article);
    expect(article).to.be.instanceOf(Article);

    let keys: string[];
    keys = Object.keys(article);
    expect(keys).to.contain("id");
    expect(keys).to.contain("title");
    expect(keys).to.contain("content");
    expect(keys).to.contain("author");
    expect(keys).to.contain("publishedAt");

    expect(article.id).to.equal(1);
    expect(article.title).to.equal("Foo");
    expect(article.content).to.equal("Bar");
    expect(article.author).to.be.instanceOf(User);
    expect(article.publishedAt.getTime()).to.equal(0);

    const author = article.author;
    expect(author).to.be.instanceOf(User);

    keys = Object.keys(author);
    expect(keys).to.contain("id");
    expect(keys).to.contain("firstName");
    expect(keys).to.contain("lastName");
    expect(keys).to.contain("addresses");

    expect(author.id).to.equal(1);
    expect(author.firstName).to.equal("John");
    expect(author.lastName).to.equal("Doe");
    expect(author.addresses).to.be.instanceOf(Array);

    const address = author.addresses[0];
    expect(address).to.be.instanceOf(Address);

    keys = Object.keys(address);
    expect(keys).to.contain("addressLine1");
    expect(keys).to.contain("addressLine2");
    expect(keys).to.contain("zipCode");

    expect(address.addressLine1).to.equal("Foo");
    expect(address.addressLine2).to.equal("Bar");
    expect(address.zipCode).to.equal(12345);
  });

});
