/*   This is an advanced qualifier function for the cmdb_ci field
 *   To use it, add the following line to the CI ref qualifier
 *  javascript:loanerCIRefQual()
 */
function LoanerReferenceQual() {
  var answer;
  var lu = new LoanerResUtils();
  var pickup_location = current.x_broi2_loaner_res_pickup_location.toString();
  var item_type = current.x_broi2_loaner_res_item_type;
  var start_date = current.x_broi2_loaner_res_start_date;
  var end_date = current.x_broi2_loaner_res_end_date;
  var manufacturer = current.x_broi2_loaner_res_laptop_type;
  answer = 'sys_idIN' + lu.availableCis(item_type, pickup_location, manufacturer, start_date, end_date);
  return answer;
}