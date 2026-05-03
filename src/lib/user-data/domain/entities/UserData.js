class UserData {
  constructor({ id, firstName, lastName, address, phone, identification, birthDate }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phone = phone;
    this.identification = identification;
    this.birthDate = birthDate;
  }
}

module.exports = UserData;
