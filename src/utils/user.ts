export const getInitials = (fullName: string) => {
  return fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
}
