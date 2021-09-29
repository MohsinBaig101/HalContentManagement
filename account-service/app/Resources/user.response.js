module.exports = (data) => {
  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    name: data.firstName + ' ' + data.lastName,
    email: data.email,
    emailVerify: data.emailVerified == 0 ? 'un-verified' : 'verified',
    phone: data.phone,
    profileImage: data.profilePic,
    status: data.status,
    role: data.Role ? {
      id: data.Role.id,
      name: data.Role.name
    } : data.role
  }
}
