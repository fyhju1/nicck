package com.thinkive.bussiness;

import org.apache.log4j.Logger;

import com.thinkive.base.config.Configuration;
import com.thinkive.base.jdbc.DataRow;
import com.thinkive.base.util.SessionHelper;
import com.thinkive.base.util.StringHelper;
import com.thinkive.framework.business.function.BaseFunction;
import com.thinkive.gateway.v2.result.Result;
import com.thinkive.project.WebConstants;
import com.thinkive.project.util.BusClientUtil;

public class LoginJudgment  extends BaseFunction
{
    Logger logger = Logger.getLogger(LoginJudgment.class);
    Result resultVo = new Result() ;
    
    @Override
    public Result execute() throws  Exception
    {
        DataRow paraMap = new DataRow();
        String custNo = SessionHelper.getString(WebConstants.SESSION_CLIENT_ID, this.getRequest().getSession());
        logger.info("custNo:" + custNo);
        String custName = SessionHelper.getString(WebConstants.SESSION_CLIENT_CUSTNAME, this.getRequest().getSession());
        logger.info("custName:" + custName);
        String key = this.getStrParameter("key");
        String fundid = this.getStrParameter("fundid");
        String catalogId = this.getStrParameter("catalogId");
        int curPage= this.getIntParameter("curPage");
        int pageSize = this.getIntParameter("pageSize");
        String passKey = Configuration.getString("system.verifyKey");
        if(key.equals(passKey))
        {
            paraMap.set("fundid", fundid);
            paraMap.set("catalogId", catalogId);
            paraMap.set("key", key);
            paraMap.set("curPage", curPage);
            paraMap.set("pageSize", pageSize);
            resultVo = BusClientUtil.invoke(904122, paraMap);
        }
        else
        {
            if(StringHelper.isNotEmpty(custName) && StringHelper.isEmpty(custNo))
            {
                resultVo.setErr_no(0);
                resultVo.setErr_info("ÄúÉÐÎ´¹ØÁª»ù½ðÕËºÅ!");
            }
            else if(StringHelper.isEmpty(custName))
            {
                resultVo.setErr_no(-999);
                resultVo.setErr_info("ÄúÉÐÎ´µÇÂ½!");
            }
            else if(StringHelper.isEmpty(catalogId) || StringHelper.isEmpty(fundid))
            {
                resultVo.setErr_no(-888);
            }
            else
            {
                    paraMap.set("custNo", custNo);
                    paraMap.set("catalogId", catalogId);
                    paraMap.set("fundid", fundid);
                    paraMap.set("curPage", curPage);
                    paraMap.set("pageSize", pageSize);
                    resultVo = BusClientUtil.invoke(904122, paraMap);
            }
        }
        
        return resultVo;
    }
}
