package root;

/**
 * 文件上传
 */
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import com.thinkive.base.config.Configuration;
import com.thinkive.base.util.DateHelper;
import com.thinkive.base.util.FileHelper;
import com.thinkive.base.util.ScriptHelper;
import com.thinkive.base.util.SessionHelper;
import com.thinkive.base.util.StringHelper;
import com.thinkive.gateway.v2.result.Result;
import com.thinkive.project.WebConstants;
import com.thinkive.project.util.BusClientUtil;
import com.thinkive.web.base.ActionResult;
import com.thinkive.web.base.BaseAction;
import com.thinkive.web.system.Application;

public class UploadPhoto extends BaseAction {

	private Logger logger = Logger.getLogger(UploadPhoto.class);

	public ActionResult doDefault() throws IOException {
		String url=this.getStrParameter("photo_url");
		HttpServletRequest request = this.getRequest();
		HttpServletResponse response = this.getResponse();
		int maxUploadSize = getMaxUploadSize();
		int contentLength = request.getContentLength();
		if (contentLength > maxUploadSize) {
			try {
				request.getInputStream().close();
			} catch (Exception ex) {
			}
			response.getWriter().write("2");
			return null;
		}

		String uploadPath = getUploadPath();
		uploadPath = FileHelper.normalize(uploadPath);
		if (!FileHelper.isDirectory(uploadPath)) {
			FileHelper.createDirectory(uploadPath);
		}

		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		try {
			List items = upload.parseRequest(this.getRequest());
			Iterator it = items.iterator();
			FileItem theItem = null;
			while (it.hasNext()) {
				FileItem item = (FileItem) it.next();
				if (!item.isFormField() && item.getName() != null
						&& !"".equals(item.getName())) {
					theItem = item;
				}
			}
			String fileName = theItem.getName();
			String extName = FileHelper.getExtension(fileName);
			if ("jsp|jspx".indexOf(extName.toLowerCase()) != -1) {
				String tempPath = uploadPath + fileName;
				if (StringHelper.isNotEmpty(tempPath)) {
					FileHelper.deleteFile(tempPath);
				}
				ScriptHelper.alert(response, "对不起，不允许上传此文件", "close");
				return null;
			}
			String newFileName = String.valueOf(DateHelper.formatDate(
					new Date(), "yyyyMMdd") + System.currentTimeMillis());
			if (!StringHelper.isEmpty(extName)) {
				newFileName = newFileName + "." + extName;
			}

			String destFile = uploadPath + newFileName;
			File photoFile = new File(destFile);

			InputStream stream = theItem.getInputStream();
			OutputStream bos = new FileOutputStream(photoFile);
			int bytesRead = 0;
			byte[] buffer = new byte[1024];
			while ((bytesRead = stream.read(buffer, 0, 1024)) != -1) {
				bos.write(buffer, 0, bytesRead);
			}
			
			bos.close();
			stream.close();
			
			String fileUrlPath=getUploadUrlPath()+newFileName;
			
			if(FileHelper.isFile(destFile))
			{
				
				
				String login_id=SessionHelper.getString(WebConstants.SESSION_CLIENT_ID, request.getSession());
				if(StringHelper.isEmpty(login_id))
				{
					response.getWriter().write("3");
					return null;
				}
				
				Map paraMap = new HashMap();
				paraMap.put("photo_url", fileUrlPath);
				paraMap.put("login_id", login_id);
				
				Result result=BusClientUtil.invoke(904502, paraMap);
				if(result.getErr_no()==0)
				{
					response.getWriter().write(fileUrlPath);
				}
				else
				{
					response.getWriter().write("3");
					return null;
				}
				
			}
			else
			{
				response.getWriter().write("3");
			}
			
			
			
		} catch (Exception e) {
			response.getWriter().write("3");
			logger.error(e);
		}
		return null;
	}

	public static String getUploadPath() {
		String datePath = DateHelper.formatDate(new Date(), "yyyyMMdd");
		String savePath = Configuration.getString("system.fileSavePath");
		if (StringHelper.isNotEmpty(savePath)) {
			return (new StringBuilder()).append(savePath).append("/upload/userPhoto/")
					.append(datePath).append("/").toString();
		}
		return (new StringBuilder()).append(Application.getRootPath())
				.append("/upload/userPhoto/").append(datePath).append("/").toString();
	}
	
	//获取图片相对路径
	public static String getUploadUrlPath()
    {
        String datePath = DateHelper.formatDate(new Date(), "yyyyMMdd");
        return (new StringBuilder()).append("/upload/userPhoto/").append(datePath).append("/").toString();
    }

	public String getRandomString(int size) {
		char[] c = { '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'q',
				'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd',
				'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm' };
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < size; i++) {
			sb.append(c[Math.abs(random.nextInt()) % c.length]);
		}
		return sb.toString();
	}

	/**
	 * 文件上传大小控制
	 * 
	 * @return
	 */
	public static int getMaxUploadSize() {
		int maxUploadSize = Configuration.getInt("system.maxUploadSize");
		return maxUploadSize == 0 ? 5242880 : maxUploadSize;
	}
}
