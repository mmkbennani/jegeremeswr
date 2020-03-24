package fm.nrjaudio.jegeremeswrs.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import fm.nrjaudio.jegeremeswrs.data.GenreApplication;
import fm.nrjaudio.jegeremeswrs.data.Webradio;
import fm.nrjaudio.jegeremeswrs.data.WebradioHighlited;
import fm.nrjaudio.jegeremeswrs.data.WebradioOfflineHistory;
import fm.nrjaudio.jegeremeswrs.data.WebradioPlacement;
import fm.nrjaudio.jegeremeswrs.service.BrandService;
import fm.nrjaudio.jegeremeswrs.service.GenreApplicationService;
import fm.nrjaudio.jegeremeswrs.service.GenreItunesService;
import fm.nrjaudio.jegeremeswrs.service.GenreOrangeService;
import fm.nrjaudio.jegeremeswrs.service.SousGenreOrangeService;
import fm.nrjaudio.jegeremeswrs.service.UsersService;
import fm.nrjaudio.jegeremeswrs.service.WebradioHighlitedService;
import fm.nrjaudio.jegeremeswrs.service.WebradioOfflineHistoryService;
import fm.nrjaudio.jegeremeswrs.service.WebradioService;

import javax.mail.MessagingException;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.nio.charset.StandardCharsets;
import java.text.CharacterIterator;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.text.StringCharacterIterator;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;
    @Autowired
	GenreOrangeService genreOrangeService;
    @Autowired
	private SousGenreOrangeService sousGenreOrangeService;
    @Autowired
	private GenreApplicationService genreApplicationService;
    @Autowired
	private GenreItunesService genreItunesService;
    @Autowired
    private WebradioService webradioService;
    @Autowired
    private UsersService usersService;
    @Autowired
	private BrandService brandService;
    @Autowired
	private WebradioHighlitedService webradioHighlitedService;
    @Autowired
	WebradioOfflineHistoryService webradioOfflineHistoryService;
    
    
    
    @Value("${spring.mail.host}")
	private String host;
    @Value("${spring.mail.port}")
	private String port;
    @Value("${spring.mail.username}")
	private String mailFrom;
    @Value("${spring.mail.password}")
	private String password;
    @Value("${emailcc}")
	private String emailcc;
    @Value("${emailToHighlited}")
	private String emailToHighlited;
    
    public void sendSimpleMessageWebradio(Webradio ancienne, Webradio webradio,boolean iSid_pressplay, boolean iSnom_wr, boolean iSclaim, boolean iSpub, boolean iSid_orange_genre, boolean iSid_itunes_genre, boolean iSid_orange_ssgenre, boolean iSPlacement, String LOGO_FOLDER, boolean isDateDebut, boolean isDateFin)  {

 
        String mailTo = "";
        if(webradio.getModifiedBy()== null || webradio.getModifiedBy().equals("")) {
        	mailTo = usersService.findById(Integer.parseInt(webradio.getCreatedBy())).get().getLogin();
        }else {
        	mailTo = usersService.findById(Integer.parseInt(webradio.getModifiedBy())).get().getLogin();
        }
        
        String subject = "[Webradios] Nouvelle demande de creation : "+webradio.getNom_wr();
        String title = "Cr&#233;ation d'une nouvelle webradio";
        if(iSid_pressplay || iSnom_wr|| iSclaim|| iSpub|| iSid_orange_genre|| iSid_itunes_genre|| iSid_orange_ssgenre|| iSPlacement) {
        	subject = "[Webradios]  Nouvelle demande de modification : "+ancienne.getNom_wr();
        	title = "Modification de la webradio "+ancienne.getNom_wr();
        }
        if(isDateFin) {
        	subject = "[Webradios]  Nouvelle demande de suppression : "+webradio.getNom_wr();
        	title = "Suppresion de la webradio "+webradio.getNom_wr();
        }
        LocalDateTime localdatetimenowInit = LocalDateTime.now();
        if((iSid_pressplay || iSnom_wr|| iSclaim|| iSpub|| iSid_orange_genre|| iSid_itunes_genre|| iSid_orange_ssgenre|| iSPlacement || isDateFin) && localdatetimenowInit.isBefore(webradio.getDate_creation_request())) {
        	subject = "[Webradios]  Nouvelle demande de modification : "+ancienne.getNom_wr();
        	title = "Modification de la webradio "+ancienne.getNom_wr();
        }
        if(ancienne.getPk()>0) {
        	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        	String localdatetimenowformatter = localdatetimenowInit.format(formatter);
        	LocalDate date = LocalDate.parse(localdatetimenowformatter);
        	ArrayList<WebradioOfflineHistory> ArrWrHistory =  webradioOfflineHistoryService.getWebradioOfflineHistoryByIdWr(webradio.getPk(),date);
        	if(ArrWrHistory != null && ArrWrHistory.size()!=0) {
        		subject = "[Webradios] Nouvelle demande de creation : "+webradio.getNom_wr();
        		title = "Cr&#233;ation de la webradio "+webradio.getNom_wr();
        	}
        	
        }else {
        	subject = "[Webradios] Nouvelle demande de creation : "+webradio.getNom_wr();
    		title = "Cr&#233;ation de la webradio "+webradio.getNom_wr();
        }
        
        
        // inline images
        Map<String, String> inlineImages = new HashMap<String, String>();
        inlineImages.put("logo", LOGO_FOLDER+"nrj_audio.png");
 
        try {
            EmbeddedImageEmailUtil.send(host, port, mailFrom, password, mailTo,emailcc,
                subject, returnHtmlEmail(ancienne,webradio,iSid_pressplay, iSnom_wr, iSclaim, iSpub, iSid_orange_genre, iSid_itunes_genre, iSid_orange_ssgenre, iSPlacement,isDateDebut,isDateFin,title), inlineImages);
            System.out.println("Email sent.");
        } catch (Exception ex) {
            System.out.println("Could not send email.");
            ex.printStackTrace();
        }
        
        
        
        
        
        
        //emailSender.send(message);
    }

    
    
    public void sendSimpleMessageWebradioHighlited(int country, int marque, String LOGO_FOLDER) {
    	
    	ArrayList<WebradioHighlited> arrayWebradioHighlited = webradioHighlitedService.getAllWebradioHighlitedByCountryBrand(country, marque);
    	ArrayList<Webradio> list_returnwebradioHighlited = new ArrayList<Webradio>();
		LocalDateTime localdatetimenow = LocalDateTime.now();
		for(WebradioHighlited webradioHighlited : arrayWebradioHighlited) {
			Webradio webradio1 = new Webradio(-1, 0,  "", 0, "", false, "", 0, 0, 0, 0, 0, localdatetimenow, localdatetimenow, localdatetimenow, localdatetimenow, "", "");
			if(webradioHighlited.getId_webradio_highlighted_1() != -1) {
				webradio1 = webradioService.findById(webradioHighlited.getId_webradio_highlighted_1()).get();
			}
			webradio1.setDate_action_request(webradioHighlited.getDate_action_request());
			Webradio webradio2 = new Webradio(-1, 0,  "", 0, "", false, "", 0, 0, 0, 0, 0, localdatetimenow, localdatetimenow, localdatetimenow, localdatetimenow, "", "");
			if(webradioHighlited.getId_webradio_highlighted_2() != -1) {
				webradio2 = webradioService.findById(webradioHighlited.getId_webradio_highlighted_2()).get();
			}
			webradio2.setDate_action_request(webradioHighlited.getDate_action_request());
			Webradio webradio3 = new Webradio(-1, 0,  "", 0, "", false, "", 0, 0, 0, 0, 0, localdatetimenow, localdatetimenow, localdatetimenow, localdatetimenow, "", "");
			if(webradioHighlited.getId_webradio_highlighted_3() != -1) {
				webradio3 = webradioService.findById(webradioHighlited.getId_webradio_highlighted_3()).get();
			}
			webradio3.setDate_action_request(webradioHighlited.getDate_action_request());
			Webradio webradio4 = new Webradio(-1, 0,  "", 0, "", false, "", 0, 0, 0, 0, 0, localdatetimenow, localdatetimenow, localdatetimenow, localdatetimenow, "", "");
			if(webradioHighlited.getId_webradio_highlighted_4() != -1) {
				webradio4 = webradioService.findById(webradioHighlited.getId_webradio_highlighted_4()).get();
			}
			webradio4.setDate_action_request(webradioHighlited.getDate_action_request());
			list_returnwebradioHighlited.add(webradio1);
			list_returnwebradioHighlited.add(webradio2);
			list_returnwebradioHighlited.add(webradio3);
			list_returnwebradioHighlited.add(webradio4);
		}
    	
    	
    	//returnHtmlEmailWebradioHighlited(list_returnwebradioHighlited,arrayWebradioHighlited.get(0),title)
    	
    	String subject = "[Webradios] Demande de Mise en avant "+brandService.findById(marque).get().getName().toUpperCase();
        String title = "Mise en avant pour "+brandService.findById(marque).get().getName().toUpperCase();
     // inline images
        Map<String, String> inlineImages = new HashMap<String, String>();
        inlineImages.put("logo", LOGO_FOLDER+"nrj_audio.png");
        try {
            EmbeddedImageEmailUtil.send(host, port, mailFrom, password, emailToHighlited,emailcc,
                subject, returnHtmlEmailWebradioHighlited(list_returnwebradioHighlited,arrayWebradioHighlited.get(0),title), inlineImages);
            System.out.println("Email sent.");
        } catch (Exception ex) {
            System.out.println("Could not send email.");
            ex.printStackTrace();
        }
    	
    }
    
    
    
    public String convertDate(LocalDateTime date_from) {
    	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    	return date_from.format(formatter);
    }
    
    public String getOrangeType (int id_orange_genre) {
    	return genreOrangeService.findById(id_orange_genre).get().getGenre_name();
    }
    
    public String getSsOrangeType (int id_ss_orange_genre) {
    	return sousGenreOrangeService.findById(id_ss_orange_genre).get().getSubgenre_name();
    }
    public String getGenreItunes (int id_itunes_genre) {
    	return genreItunesService.findById(id_itunes_genre).get().getGenre_name();
    }
    public GenreApplication getWrPlacement(int id_wr_placement) {
    	return genreApplicationService.findById(id_wr_placement).get();
    }
    
    
    public String trGenreApplicationNotModified (Webradio webradio) {
    	
    	String trString = "";
    	List<WebradioPlacement> webradioPlacement = webradio.getWrPlacement();
    	
    	for(int i = 0; i<webradioPlacement.size();i++) {
    		WebradioPlacement unWebradioPlacement =  webradioPlacement.get(i);
    		GenreApplication unGenreApplication = getWrPlacement(unWebradioPlacement.getId_genre_application());
    		trString = trString +
    				"<TR>"+
						"<TH align=\"center\">"+
							"<P style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left;'>"+
								"*  "+unGenreApplication.getGenre_name()+
							"</P>"+
						"</TH>"+
						"<TH style='background:  "+unGenreApplication.getColor()+";' align=\"center\">"+
							"<P style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: black; TEXT-ALIGN: center;vertical-align: middle;margin-bottom: 0px;'>"+
								(unGenreApplication.getColor() == null?"":unGenreApplication.getColor())+
							"</P>"+
						"</TH>"+
						"<TH align=\"center\">"+
							"<P style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left;margin-left: 30px;'>"+
									((unWebradioPlacement.getId_webradio_avantapres() == null)? "" :((unWebradioPlacement.getAvantapres()==0?"Avant : ":"Apr&#233;s : ")))
								  + ((unWebradioPlacement.getId_webradio_avantapres() == null)? "" : webradioService.findById(unWebradioPlacement.getId_webradio_avantapres()).get().getNom_wr())+
							"</P>"+
						"</TH>"+
					"</TR>";
    	}
    	
    	return trString;
    }
    
    
    public String trGenreApplication (Webradio webradio) {
    	
    	String trString = "";
    	List<WebradioPlacement> webradioPlacement = webradio.getWrPlacement();
    	
    	
    	
    	for(int i = 0; i<webradioPlacement.size();i++) {
    		WebradioPlacement unWebradioPlacement =  webradioPlacement.get(i);
    		GenreApplication unGenreApplication = getWrPlacement(unWebradioPlacement.getId_genre_application());
    		trString = trString +
    				"<TR>"+
						"<TH align=\"center\">"+
							"<P style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left;'>"+
								"*  "+unGenreApplication.getGenre_name()+
							"</P>"+
						"</TH>"+
						"<TH style='background:  "+unGenreApplication.getColor()+";' align=\"center\">"+
							"<P style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: black; TEXT-ALIGN: center;vertical-align: middle;margin-bottom: 0px;'>"+
								(unGenreApplication.getColor() == null?"":unGenreApplication.getColor())+
							"</P>"+
						"</TH>"+
						"<TH align=\"center\">"+
							"<P style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left;margin-left: 30px;'>"+
									((unWebradioPlacement.getId_webradio_avantapres() == null)? "" :((unWebradioPlacement.getAvantapres()==0?"Avant : ":"Apr&#233;s : ")))
								  + ((unWebradioPlacement.getId_webradio_avantapres() == null)? "" : webradioService.findById(unWebradioPlacement.getId_webradio_avantapres()).get().getNom_wr())+
							"</P>"+
						"</TH>"+
					"</TR>";
    	}
    	return trString;
    }
    
    public String transformText (String aTransformer) {
    	
    	StringBuilder s = new StringBuilder(aTransformer.length());
    	
    	CharacterIterator it = new StringCharacterIterator(aTransformer);
    	for (char ch = it.first(); ch != CharacterIterator.DONE; ch = it.next()) {
    	    switch (ch) {
    	        case 'é':
    	            s.append("&#233;");
    	            break;
    	        case 'É':
    	            s.append("&#201;");
    	            break;
    	        case 'ê':
    	            s.append("&#234;");
    	            break;
    	        case 'Ê':
    	            s.append("&#202;");
    	            break;
    	        case 'è':
    	            s.append("&#232;");
    	            break;
    	        case 'È':
    	            s.append("&#200;");
    	            break;
    	        case 'ç':
    	            s.append("&#231;");
    	            break;
    	        case 'Ç':
    	            s.append("&#199;");
    	            break;
    	        case 'â':
    	            s.append("&#226;");
    	            break;
    	        case 'Â':
    	            s.append("&#194;");
    	            break;
    	        case 'à':
    	            s.append("&#224;");
    	            break;
    	        case 'À':
    	            s.append("&#192;");
    	            break;
    	        default:
    	            s.append(ch);
    	            
    	            break;
    	    }
    	}
    	
    	return s.toString();
    }
    
    
    public String returnHtmlEmail (Webradio ancienne, Webradio webradio,boolean iSid_pressplay, boolean iSnom_wr, boolean iSclaim, boolean iSpub, boolean iSid_orange_genre, boolean iSid_itunes_genre, boolean iSid_orange_ssgenre, boolean iSPlacement, boolean isDateDebut, boolean isDateFin, String title) {
    	boolean isMarqueChange = true;
    	
    	String emailconte = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
        		"<html xmlns='http://www.w3.org/1999/xhtml' xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office'>"+

        		"<head>"+
        		    "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />"+
        		    "<meta name='x-apple-disable-message-reformatting' />"+
        		    "<meta name='viewport' content='width=device-width, initial-scale=1.0' />"+
        		    "<style type='text/css'>"+
        		        "body,"+
        		        ".maintable {"+
        		            "height: 100% !important;"+
        		            "width: 100% !important;"+
        		            "margin: 0;"+
        		            "padding: 0;"+
        		        "}"+
        		        
        		        "img,"+
        		        "a img {"+
        		           " border: 0;"+
        		           " outline: none;"+
        		           " text-decoration: none;"+
        		        "}"+
        		        
        		        "p {"+
        		            "margin-top: 0;"+
        		            "margin-right: 0;"+
        		            "margin-left: 0;"+
        		            "padding: 0;"+
        		        "}"+
        		        
        		        ".ReadMsgBody {"+
        		            "width: 100%;"+
        		        "}"+
        		        
        		        ".ExternalClass {"+
        		            "width: 100%;"+
        		        "}"+
        		        
        		        ".ExternalClass,"+
        		        ".ExternalClass p,"+
        		        ".ExternalClass span,"+
        		        ".ExternalClass font,"+
        		        ".ExternalClass td,"+
        		        ".ExternalClass div {"+
        		            "line-height: 100%;"+
        		        "}"+
        		        
        		        "img {"+
        		            "-ms-interpolation-mode: bicubic;"+
        		        "}"+
        		        
        		        "body,"+
        		        "table,"+
        		        "td,"+
        		        "p,"+
        		        "a,"+
        		        "li,"+
        		        "blockquote {"+
        		            "-ms-text-size-adjust: 100%;"+
        		            "-webkit-text-size-adjust: 100%;"+
        		        "}"+
        		    "</style>"+
        		    "<style type='text/css'>"+
        		        "@media only screen and (max-width: 480px) {"+
        		            ".rtable {"+
        		                "width: 100% !important;"+
        		            "}"+
        		            ".rtable tr {"+
        		                "height: auto !important;"+
        		                "display: block;"+
        		            "}"+
        		            ".contenttd {"+
        		                "max-width: 100% !important;"+
        		                "display: block;"+
        		                "width: auto !important;"+
        		            "}"+
        		            ".contenttd:after {"+
        		                "content: '';"+
        		                "display: table;"+
        		                "clear: both;"+
        		            "}"+
        		            ".hiddentds {"+
        		                "display: none;"+
        		            "}"+
        		            ".imgtable,"+
        		            ".imgtable table {"+
        		                "max-width: 100% !important;"+
        		                "height: auto;"+
        		                "float: none;"+
        		                "margin: 0 auto;"+
        		            "}"+
        		            ".imgtable.btnset td {"+
        		                "display: inline-block;"+
        		            "}"+
        		            ".imgtable img {"+
        		                "width: 100%;"+
        		                "height: auto !important;"+
        		                "display: block;"+
        		            "}"+
        		            "table {"+
        		                "float: none;"+
        		            "}"+
        		            ".mobileHide {"+
        		                "display: none !important;"+
        		            "}"+
        		        "}"+
        		        
        		        "@media only screen and (min-width: 481px) {"+
        		            ".desktopHide {"+
        		                "display: none !important;"+
        		            "}"+
        		        "}"+
        				
        				".styleText {"+
        					"FONT-SIZE: 16px;"+
        					"MARGIN-BOTTOM: 1em;"+
        					"FONT-FAMILY: arial, helvetica, sans-serif;"+
        					"MARGIN-TOP: 0px;"+
        					"COLOR: #575757;"+
        					"TEXT-ALIGN: left;"+
        					"LINE-HEIGHT: 25px;"+
        				"}"+
        		    "</style>"+
        		"</head>"+

        		"<body style='overflow: auto; padding:0; margin:0; font-size: 14px; font-family: arial, helvetica, sans-serif; cursor:auto; background-color:#444545'>"+
        		    "<TABLE style='BACKGROUND-COLOR: #444545' cellSpacing=0 cellPadding=0 width='100%'>"+
        		        "<TR>"+
        		            "<TD style='FONT-SIZE: 0px; HEIGHT: 0px; LINE-HEIGHT: 0'>"+
        		            "</TD>"+
        		        "</TR>"+
        		        "<TR>"+
        		            "<TD vAlign=top>"+
        		                "<TABLE class=rtable style='WIDTH: 750px; MARGIN: 0px auto' cellSpacing=0 cellPadding=0 width=750 align=center border=0>"+
        		                    "<TR>"+
        		                        "<TH class=contenttd style='BORDER-TOP: #ff0000 5px solid; BORDER-RIGHT: medium none; WIDTH: 600px; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: #feffff'>"+
        		                            "<TABLE style='WIDTH: 100%' cellSpacing=0 cellPadding=0 align=left data-hidewhenresp='0'>"+
        		                                "<TR style='HEIGHT: 627px' height=627>"+
        		                                    "<TH class=contenttd style='BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 560px; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 20px; TEXT-ALIGN: left; PADDING-TOP: 20px; PADDING-LEFT: 20px; BORDER-LEFT: medium none; PADDING-RIGHT: 20px; BACKGROUND-COLOR: transparent'>"+
        		                                        "<P style='FONT-SIZE: 24px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #ff0000; TEXT-ALIGN: center; LINE-HEIGHT: 37px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=center>"+
        		                                            "<STRONG>"+title+"</STRONG>"+
        		                                        "</P>"+
        		                                        "<P style='FONT-SIZE: 14px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 22px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=left>"+
        		                                            "<STRONG>Bonjour, <BR><BR>Votre demande a &#233;t&#233; transmise &#224; l'&#233;quipe NRJ AUDIO.</STRONG>"+
        		                                        "</P>"+
        		                                        "<P style='FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=left>Voici un r&#233;sum&#233; de votre formulaire :"+
        													"<TABLE style='WIDTH: 100%' cellSpacing=0 cellPadding=0 align=left data-hidewhenresp='0'>"+
	        													"<TR>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;padding-bottom: 20px;'> Date d'action : "+
																	"</TH>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px; padding-bottom: 20px;'>"+
																		convertDate(webradio.getDate_action_request())+
																	"</TH>"+
																"</TR>"+
        														(isMarqueChange?"<TR>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Antenne : "+
        															"</TH>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
        															 	brandService.findById(webradio.getId_radio()).get().getName().toUpperCase()+
        															"</TH>"+
        														"</TR>":
        														"<TR>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Antenne : "+
	    															"</TH>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
	    																brandService.findById(webradio.getId_radio()).get().getName().toUpperCase()+
	    															"</TH>"+
	    														"</TR>")+
        														(iSnom_wr?"<TR>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Nom : "+
        															"</TH>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
        																webradio.getNom_wr()+"(Ex : "+ancienne.getNom_wr()+")"+
        															"</TH>"+
        														"</TR>"
        														:"<TR>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Nom : "+
	    															"</TH>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
	    																webradio.getNom_wr()+
	    															"</TH>"+
	    														"</TR>")+
        														(iSid_pressplay?"<TR>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Id Pressplay :"+ 
        															"</TH>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
        																webradio.getId_pressplay()+
        															"</TH>"+
        														"</TR>"
        														:"<TR>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Id Pressplay :"+ 
	    															"</TH>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
	    																webradio.getId_pressplay()+
	    															"</TH>"+
	    														"</TR>")+
        														(iSclaim?"<TR>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Claim : "+
        															"</TH>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
        																webradio.getClaim()+
        															"</TH>"+
        														"</TR>"
        														:"<TR>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Claim : "+
        															"</TH>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
        																webradio.getClaim()+
        															"</TH>"+
        														"</TR>")+
        														(iSpub?"<TR>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Publicit&#233; : "+
        															"</TH>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
        															(webradio.isPub() == true ? "Avec" : "Sans")+
        															"</TH>"+
        														"</TR>"
        														:"<TR>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Publicit&#233; : "+
	    															"</TH>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
	    															(webradio.isPub() == true ? "Avec" : "Sans")+
	    															"</TH>"+
	    														"</TR>")+
        														(isDateDebut?"<TR>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Mise On Air : "+
        															"</TH>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
        																convertDate(webradio.getDate_creation_request())+
        															"</TH>"+
        														"</TR>"
        														:"<TR>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Mise On Air : "+
	    															"</TH>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
	    																convertDate(webradio.getDate_creation_request())+
	    															"</TH>"+
	    														"</TR>")+
        														(isDateFin?"<TR>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Mise Off Air : "+
        															"</TH>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
        																(webradio.getDate_deletion_request() == null ?"Pas de date de fin programm&#233;e":convertDate(webradio.getDate_deletion_request()))+
        															"</TH>"+
        														"</TR>"
        														:"<TR>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Mise Off Air : "+
	    															"</TH>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
	    																(webradio.getDate_deletion_request() == null ?"Pas de date de fin programm&#233;e":convertDate(webradio.getDate_deletion_request()))+
	    															"</TH>"+
	    														"</TR>")+
        														(iSid_orange_genre?"<TR>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Genre Orange : "+
        															"</TH>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
        																getOrangeType(webradio.getId_orange_genre())+
        															"</TH>"+
        														"</TR>"
        														:"<TR>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Genre Orange : "+
	    															"</TH>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
	    																getOrangeType(webradio.getId_orange_genre())+
	    															"</TH>"+
	    														"</TR>")+
        														(iSid_orange_ssgenre?"<TR>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Sous-Genre Orange : "+
        															"</TH>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
        																getSsOrangeType(webradio.getId_orange_ssgenre())+
        															"</TH>"+
        														"</TR>"
        														:"<TR>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Sous-Genre Orange : "+
	    															"</TH>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
	    																getSsOrangeType(webradio.getId_orange_ssgenre())+
	    															"</TH>"+
	    														"</TR>")+
        														(iSid_itunes_genre?"<TR>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Genre Itunes : "+
        															"</TH>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
        																getGenreItunes(webradio.getId_itunes_genre()) +
        															"</TH>"+
        														"</TR>"
        														: "<TR>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Genre Itunes : "+
	    															"</TH>"+
	    															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
	    																getGenreItunes(webradio.getId_itunes_genre()) +
	    															"</TH>"+
	    														"</TR>")+
        														"<TR>"+
        															"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Genres dans l'application : "+
        															"</TH>"+
        														"</TR>"+
        														
	        													"</TABLE>"+
	        													(iSPlacement?"<TABLE style='WIDTH: 100%' cellSpacing=0 cellPadding=0 align=left data-hidewhenresp='0'>"+
	        														trGenreApplication(webradio)+
	        													"</TABLE>"
	        													:"<TABLE style='WIDTH: 100%' cellSpacing=0 cellPadding=0 align=left data-hidewhenresp='0'>"+
	        														trGenreApplicationNotModified(webradio)+
																"</TABLE>")+
	        													"<TABLE style='WIDTH: 100%' cellSpacing=0 cellPadding=0 align=left data-hidewhenresp='0'>"+
	        														"<TR>"+
	        															"<TH>"+
	        																"<P style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;margin-top: 20px;'>"+
	        																	"Nous vous remercions d'avoir utilis&#233; nos services."+
	        																"</P>"+
	        															"</TH>"+
	        														"</TR>"+												
	        													"</TABLE>"+
        		                                        "</P>"+
        		                                    "</TH>"+
        		                                "</TR>"+
        		                            "</TABLE>"+
        		                        "</TH>"+
        		                    "</TR>"+
        		                    "<TR>"+
        		                        "<TH class=contenttd style='BORDER-TOP: #ff0000 5px solid; BORDER-RIGHT: medium none; WIDTH: 600px; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: #feffff'>"+
        		                            "<TABLE style='WIDTH: 100%' cellSpacing=0 cellPadding=0 align=left data-hidewhenresp='0'>"+
        		                                "<TR style='HEIGHT: 174px' height=174>"+
        		                                    "<TH class=contenttd style='BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 159px; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 20px; TEXT-ALIGN: left; PADDING-TOP: 20px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent'>"+
        		                                        "<TABLE class=imgtable style='MARGIN-LEFT: 0px; MARGIN-RIGHT: auto' cellSpacing=0 cellPadding=0 border=0>"+
        		                                            "<TR>"+
        		                                                "<TD style='PADDING-BOTTOM: 2px; PADDING-TOP: 2px; PADDING-LEFT: 2px; PADDING-RIGHT: 2px' align=center>"+
        		                                                    "<TABLE cellSpacing=0 cellPadding=0 border=0>"+
        		                                                        "<TR>"+
        		                                                            "<TD style='BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; BACKGROUND-COLOR: transparent'>"+
        		                                                                "<IMG style='BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; DISPLAY: block' alt='' src='cid:logo' width=130 data-stylelock='0' hspace='0' vspace='0'>"+
        		                                                            "</TD>"+
        		                                                        "</TR>"+
        		                                                    "</TABLE>"+
        		                                                "</TD>"+
        		                                            "</TR>"+
        		                                        "</TABLE>"+
        		                                    "</TH>"+
        		                                    "<TH class=contenttd style='BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 381px; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 20px; TEXT-ALIGN: left; PADDING-TOP: 20px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent'>"+
        		                                        "<P style='FONT-SIZE: 16px; MARGIN-BOTTOM: 0px; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=left>"+
        		                                            "<STRONG>L\'&#233;quipe NRJ AUIDO</STRONG>"+
        		                                        "</P>"+
        		                                        "<P style='FONT-SIZE: 12px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 19px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=left>&#160;</P>"+
        		                                        "<P style='FONT-SIZE: 14px; MARGIN-BOTTOM: 0.5em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 22px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=left>&#160;</P>"+
        		                                    "</TH>"+
        		                                "</TR>"+
        		                            "</TABLE>"+
        		                        "</TH>"+
        		                    "</TR>"+
        		                "</TABLE>"+
        		            "</TD>"+
        		        "</TR>"+
        		        "<TR>"+
        		            "<TD style='FONT-SIZE: 0px; HEIGHT: 8px; LINE-HEIGHT: 0'>&#160;"+
        		            "</TD>"+
        		        "</TR>"+
        		    "</TABLE>"+
        		"</body>"+

        		"</html>";
    	
    	return transformText(emailconte);
    }
    
    
    
    
    public String returnHtmlEmailWebradioHighlited (ArrayList<Webradio> arrayWebradio,WebradioHighlited webradioHighlited, String title) {

    	String emailconte = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
    			"<html xmlns='http://www.w3.org/1999/xhtml' xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office'>"+

    			"<head>"+
    			    "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />"+
    			    "<meta name='x-apple-disable-message-reformatting' />"+
    			    "<meta name='viewport' content='width=device-width, initial-scale=1.0' />"+
    			    "<style type='text/css'>"+
    			        "body,"+
    			        ".maintable {"+
    			            "height: 100% !important;"+
    			            "width: 100% !important;"+
    			            "margin: 0;"+
    			            "padding: 0;"+
    			        "}"+
    			        
    			        "img,"+
    			        "a img {"+
    			            "border: 0;"+
    			            "outline: none;"+
    			            "text-decoration: none;"+
    			        "}"+
    			        
    			        "p {"+
    			            "margin-top: 0;"+
    			            "margin-right: 0;"+
    			            "margin-left: 0;"+
    			            "padding: 0;"+
    			        "}"+
    			        
    			        ".ReadMsgBody {"+
    			            "width: 100%;"+
    			        "}"+
    			        
    			        ".ExternalClass {"+
    			            "width: 100%;"+
    			        "}"+
    			        
    			        ".ExternalClass,"+
    			        ".ExternalClass p,"+
    			        ".ExternalClass span,"+
    			        ".ExternalClass font,"+
    			        ".ExternalClass td,"+
    			        ".ExternalClass div {"+
    			            "line-height: 100%;"+
    			        "}"+
    			        
    			        "img {"+
    			            "-ms-interpolation-mode: bicubic;"+
    			        "}"+
    			        
    			        "body,"+
    			        "table,"+
    			        "td,"+
    			        "p,"+
    			        "a,"+
    			        "li,"+
    			        "blockquote {"+
    			            "-ms-text-size-adjust: 100%;"+
    			            "-webkit-text-size-adjust: 100%;"+
    			        "}"+
    			    "</style>"+
    			    "<style type='text/css'>"+
    			        "@media only screen and (max-width: 480px) {"+
    			            ".rtable {"+
    			                "width: 100% !important;"+
    			            "}"+
    			            ".rtable tr {"+
    			                "height: auto !important;"+
    			                "display: block;"+
    			            "}"+
    			            ".contenttd {"+
    			                "max-width: 100% !important;"+
    			                "display: block;"+
    			                "width: auto !important;"+
    			            "}"+
    			            ".contenttd:after {"+
    			                "content: '';"+
    			                "display: table;"+
    			                "clear: both;"+
    			            "}"+
    			            ".hiddentds {"+
    			                "display: none;"+
    			            "}"+
    			            ".imgtable,"+
    			            ".imgtable table {"+
    			                "max-width: 100% !important;"+
    			                "height: auto;"+
    			                "float: none;"+
    			                "margin: 0 auto;"+
    			            "}"+
    			            ".imgtable.btnset td {"+
    			                "display: inline-block;"+
    			            "}"+
    			            ".imgtable img {"+
    			                "width: 100%;"+
    			                "height: auto !important;"+
    			                "display: block;"+
    			            "}"+
    			            "table {"+
    			                "float: none;"+
    			            "}"+
    			            ".mobileHide {"+
    			                "display: none !important;"+
    			            "}"+
    			        "}"+
    			        
    			        "@media only screen and (min-width: 481px) {"+
    			            ".desktopHide {"+
    			                "display: none !important;"+
    			            "}"+
    			        "}"+
    			    "</style>"+
    			"</head>"+

    			"<body style='overflow: auto; padding:0; margin:0; font-size: 14px; font-family: arial, helvetica, sans-serif; cursor:auto; background-color:#444545'>"+
    			    "<TABLE style='BACKGROUND-COLOR: #444545' cellSpacing=0 cellPadding=0 width='100%'>"+
    			        "<TR>"+
    			            "<TD style='FONT-SIZE: 0px; HEIGHT: 0px; LINE-HEIGHT: 0'>"+
    			            "</TD>"+
    			        "</TR>"+
    			        "<TR>"+
    			            "<TD vAlign=top>"+
    			                "<TABLE class=rtable style='WIDTH: 750px; MARGIN: 0px auto' cellSpacing=0 cellPadding=0 width=750 align=center border=0>"+
    			                    "<TR>"+
    			                        "<TH class=contenttd style='BORDER-TOP: #ff0000 5px solid; BORDER-RIGHT: medium none; WIDTH: 600px; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: #feffff'>"+
    			                            "<TABLE style='WIDTH: 100%' cellSpacing=0 cellPadding=0 align=left data-hidewhenresp='0'>"+
    			                                "<TR style='HEIGHT: 433px' height=433>"+
    			                                    "<TH class=contenttd style='BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 560px; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 20px; TEXT-ALIGN: left; PADDING-TOP: 20px; PADDING-LEFT: 20px; BORDER-LEFT: medium none; PADDING-RIGHT: 20px; BACKGROUND-COLOR: transparent'>"+
    			                                        "<P style='FONT-SIZE: 24px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #ff0000; TEXT-ALIGN: center; LINE-HEIGHT: 37px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=center>"+
    			                                            "<STRONG>"+title+"</STRONG>"+
    			                                        "</P>"+
    			                                        "<P style='FONT-SIZE: 14px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 22px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=left>"+
    			                                            "<STRONG>Bonjour, <BR><BR>Votre demande a été transmise à l'équipe NRJ AUDIO</STRONG>"+
    			                                        "</P>"+
    			                                            
    			                                        
    			                                        
														"<P style='FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=left>Voici un résumé de votre formulaire :"+
															"<TABLE style='WIDTH: 100%' cellSpacing=0 cellPadding=0 align=left data-hidewhenresp='0'>"+
																"<TR>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Date d'action : "+
																	"</TH>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: red; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
																		convertDate(webradioHighlited.getDate_action_request())+
																	"</TH>"+
																"</TR>"+
																"<TR>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px; padding-bottom: 20px;'> Antenne : "+
																	"</TH>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px; padding-bottom: 20px;'>"+
																	brandService.findById(webradioHighlited.getBrand()).get().getName().toUpperCase()+
																	"</TH>"+
																"</TR>"+
																
																
															"</TABLE>"+
															"<TABLE style='WIDTH: 100%' cellSpacing=0 cellPadding=0 align=left data-hidewhenresp='0'>"+
																"<TR>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Mise en Avant 1 : "+
																	"</TH>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
																	(arrayWebradio.get(0).getNom_wr()== null || arrayWebradio.get(0).getNom_wr().equals("")?"":arrayWebradio.get(0).getNom_wr())+
																	"</TH>"+
																"</TR>"+
																"<TR>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Mise en Avant 2 : "+
																	"</TH>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
																	(arrayWebradio.get(1).getNom_wr()== null || arrayWebradio.get(1).getNom_wr().equals("")?"":arrayWebradio.get(1).getNom_wr())+
																	"</TH>"+
																"</TR>"+
																"<TR>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'> Mise en Avant 3 : "+
																	"</TH>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px;'>"+
																	(arrayWebradio.get(2).getNom_wr()== null || arrayWebradio.get(2).getNom_wr().equals("")?"":arrayWebradio.get(2).getNom_wr())+
																	"</TH>"+
																"</TR>"+
																"<TR>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px; padding-bottom: 25px;'> Mise en Avant 4 : "+
																	"</TH>"+
																	"<TH style = 'FONT-SIZE: 16px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px; padding-bottom: 25px;'>"+
																	(arrayWebradio.get(3).getNom_wr()== null || arrayWebradio.get(3).getNom_wr().equals("")?"":arrayWebradio.get(3).getNom_wr())+
																	"</TH>"+
																"</TR>"+
																
															"</TABLE>"+
    			                                        "</P>"+
    			                                        "<P style='FONT-SIZE: 14px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 22px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=left>"+
    			                                            "<STRONG>Nous vous remercions d'avoir utilisé nos services.</STRONG>"+
    			                                        "</P>"+
    			                                    "</TH>"+
    			                                "</TR>"+
    			                            "</TABLE>"+
    			                        "</TH>"+
    			                    "</TR>"+
    			                    "<TR>"+
    			                        "<TH class=contenttd style='BORDER-TOP: #ff0000 5px solid; BORDER-RIGHT: medium none; WIDTH: 600px; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: #feffff'>"+
    			                            "<TABLE style='WIDTH: 100%' cellSpacing=0 cellPadding=0 align=left data-hidewhenresp='0'>"+
    			                                "<TR style='HEIGHT: 174px' height=174>"+
    			                                    "<TH class=contenttd style='BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 159px; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 20px; TEXT-ALIGN: left; PADDING-TOP: 20px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent'>"+
    			                                        "<TABLE class=imgtable style='MARGIN-LEFT: 0px; MARGIN-RIGHT: auto' cellSpacing=0 cellPadding=0 border=0>"+
    			                                            "<TR>"+
    			                                                "<TD style='PADDING-BOTTOM: 2px; PADDING-TOP: 2px; PADDING-LEFT: 2px; PADDING-RIGHT: 2px' align=center>"+
    			                                                    "<TABLE cellSpacing=0 cellPadding=0 border=0>"+
    			                                                        "<TR>"+
    			                                                            "<TD style='BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; BACKGROUND-COLOR: transparent'>"+
    			                                                                "<IMG style='BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; DISPLAY: block' alt='' src='cid:logo' width=130 data-stylelock='0' hspace='0' vspace='0'>"+
    			                                                            "</TD>"+
    			                                                        "</TR>"+
    			                                                    "</TABLE>"+
    			                                                "</TD>"+
    			                                            "</TR>"+
    			                                        "</TABLE>"+
    			                                    "</TH>"+
    			                                    "<TH class=contenttd style='BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 381px; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 20px; TEXT-ALIGN: left; PADDING-TOP: 20px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent'>"+
    			                                        "<P style='FONT-SIZE: 16px; MARGIN-BOTTOM: 0px; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 25px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=left>"+
    			                                            "<STRONG>L'équipe NRJ AUIDO</STRONG>"+
    			                                        "</P>"+
    			                                        "<P style='FONT-SIZE: 12px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 19px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=left>&#160;</P>"+
    			                                        "<P style='FONT-SIZE: 14px; MARGIN-BOTTOM: 0.5em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 22px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly' align=left>&#160;</P>"+
    			                                    "</TH>"+
    			                                "</TR>"+
    			                            "</TABLE>"+
    			                        "</TH>"+
    			                    "</TR>"+
    			                "</TABLE>"+
    			            "</TD>"+
    			        "</TR>"+
    			        "<TR>"+
    			            "<TD style='FONT-SIZE: 0px; HEIGHT: 8px; LINE-HEIGHT: 0'>"+
    			            "</TD>"+
    			        "</TR>"+
    			    "</TABLE>"+
    			"</body>"+

    			"</html>";
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	return transformText(emailconte);
    }
    
}