const checksumLib=require('./paytm/checksum/checksum');
const port=3000;
var today=new Date();

module.exports=(app)=>{
    app.get('/payment',(req,res)=>{
        let params={};
        params['MID']='yBfxLC04433477712014'
        params['WEBSITE']='WEBSTAGING'
        params['CHANNEL_ID']='WEB'
        params['INDUSTRY_TYPE_ID']='Retail'

        params['ORDER_ID']="ORD"+today.getDate()+today.getHours() + today.getMinutes()+today.getSeconds()
        params['CUST_ID']="CUS"+today.getDate()+today.getHours() + today.getMinutes()+today.getSeconds()
        

        params['TXN_AMOUNT']='200'
        params['CALLBACK_URL']='http://localhost:'+port+'/callback'
        params['EMAIL']='apoorvranjan343@gmail.com'
        params['MOBILE_NO']='8292819067'


        checksumLib.genchecksum(params,'Hywr&KuX4Ysf_qqP',(err,checksum)=>{
            let txn_url="https://securegw-stage.paytm.in/order/process";
            let formFields="";
            for(x in params){
                formFields += "<input type='hidden' name='"+x+"' value='"+params[x]+"'/>"
            }
                formFields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"'>"
                var html='<html><body><center>Please Wait! Do not refresh the page</center><form method="post" action="'+txn_url+'" name="paymentForm">'+formFields+'</form><script type="text/javascript">document.paymentForm.submit()</script></body><html>'

                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(html);
                res.end();
        })
    })
}