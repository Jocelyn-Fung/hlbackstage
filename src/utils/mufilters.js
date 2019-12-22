export const dateForm = (data, spe) => {
  data = new Date(data)
  spe = spe || '/'
  var year = data.getFullYear()
  var month = data.getMonth() + 1
  var date = data.getDate()
  var hour = data.getHours()
  var mins = data.getMinutes()
  return year + spe + month + spe + date + spe + hour + ' : ' + mins
}
