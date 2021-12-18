export class User {
  constructor(name, guardianName, healthId, mobile, gender, address) {
    this.setname(name)
    this.guardianName = guardianName
    this.healthId = healthId
    this.mobile = mobile
    this.gender = gender
    this.address = address
  }
  getname() {
    return this.name
  }
  setname(newName) {
    this.name = newName
  }

  get guardianName() {
    return this.guardianName
  }
  // set guardianName(guardianName) {
  //   this.guardianName = guardianName
  // }
  // get healthId() {
  //   return this.healthId
  // }
  // set healthId(healthId) {
  //   this.healthId = healthId
  // }

  // get mobile() {
  //   return this.mobile
  // }
  // set mobile(mobile) {
  //   this.mobile = mobile
  // }

  // get gender() {
  //   return this.gender
  // }
  // set gender(gender) {
  //   this.gender = gender
  // }
  // get address() {
  //   return this.address
  // }
  // set address(address) {
  //   this.address = address
  // }
}
