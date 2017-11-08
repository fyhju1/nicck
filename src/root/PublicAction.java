package root;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.log4j.Logger;

import com.thinkive.base.util.RequestHelper;
import com.thinkive.base.util.StringHelper;
import com.thinkive.web.base.BaseAction;


public class PublicAction extends BaseAction
{
	
	private static Logger logger = Logger.getLogger(PublicAction.class);
		
	/**
	  * ����: �ļ�����
	  * ��˾: ������˼����Ϣ�������޹�˾ 
	  * ���ߣ�����
	  * ��������:  2014-9-6
	  * ����ʱ��: ����2:54:51
	  * @param
	  * @return
	 * @throws UnsupportedEncodingException 
	  */
	public void doSoftDownload() throws UnsupportedEncodingException
	{
		System.out.println("��ʼ���أ�");
		String file = RequestHelper.getString(getRequest(), "url");//�ļ����ص�ַ
		String fileName = RequestHelper.getString(getRequest(), "name");//�ļ�����
		
		
		fileName = StringHelper.encodeURL( java.net.URLDecoder.decode(fileName, "UTF-8"));

		
		if (StringHelper.isBlank(file))
		{
			return;
		}
		File f = new File(this.getApplication().getRealPath("") + file);
		if (!f.isFile())
		{
			return;
		}
		String[] sepsplit = file.split("/");
		String uploadFileName = sepsplit[sepsplit.length - 1];
		
		String downloadName = fileName+uploadFileName.substring(uploadFileName.lastIndexOf("."));//�ļ�������ʾ����
		
		if(getRequest().getHeader("User-Agent").toLowerCase().indexOf("firefox") > 0){
			 downloadName = new String(downloadName.getBytes("UTF-8"), "ISO-8859-1");   //firefox�����
		 } else if(getRequest().getHeader("User-Agent").toUpperCase().indexOf("MSIE") > 0){
			 downloadName = URLEncoder.encode(downloadName, "UTF-8");//IE�����
		 }else{
			 downloadName = URLEncoder.encode(downloadName, "UTF-8");//����
		 }
		InputStream input = null;
		OutputStream output = null;
		getResponse().setContentType("application/octet-stream");
		getResponse().setHeader("Location", downloadName);
		getResponse().setHeader("Cache-Control", "max-age=" + 3);
		getResponse().setHeader("Content-Disposition", "attachment; filename=" + downloadName);
		try
		{
			input = new BufferedInputStream(new FileInputStream(f));
			output = new BufferedOutputStream(this.getResponse().getOutputStream());
			byte[] b = new byte[1024];
			int len = 0;
			while ((len = input.read(b)) != -1)
			{
				output.write(b, 0, len);
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
		finally
		{
			if (output != null)
			{
				try
				{
					output.flush();
					output.close();
				}
				catch (IOException ex)
				{
					ex.printStackTrace();
				}
			}
			if (input != null)
			{
				try
				{
					input.close();
				}
				catch (IOException ex)
				{
					ex.printStackTrace();
				}
			}
		}
	}
}
