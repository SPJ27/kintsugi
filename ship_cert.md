1. User submits a project 
2. Add a new ship event in the db, with hours as (total hours - approved hours)
3. Approve/Reject
   |--> If approved, set the shipped hours to (current shipped hours + approved hours of this ship), and add the number of currency to the their account
   |--> If rejected, dont modify anything