var login_page = new LoginPage();

function LoginPage(){
	
	this.STR_HEAD_TITLE		= 0;
	this.STR_PAGE_TITLE		= 1;
	this.STR_USERNAME_BOX	= 2;
	this.STR_PASSWORD_BOX	= 3;
	this.STR_CONNEXION		= 4;
	this.STR_USERNAME		= 5;
	this.STR_REQ_AUTH		= 6;
	
	this._en_text = new Array();
	this._en_text[this.STR_HEAD_TITLE] 		= "NRJ Audio - Webradios measurement";
	this._en_text[this.STR_PAGE_TITLE] 		= "Webradios measurement";
	this._en_text[this.STR_USERNAME_BOX] 	= "user name";
	this._en_text[this.STR_PASSWORD_BOX] 	= "password";
	this._en_text[this.STR_CONNEXION] 		= "Connection";
	this._en_text[this.STR_USERNAME] 		= "User name";
	this._en_text[this.STR_REQ_AUTH] 		= "Authentication Requested";
	
	this._fr_text = new Array();
	this._fr_text[this.STR_HEAD_TITLE] 		= "NRJ Audio - Audiences des WebRadios";
	this._fr_text[this.STR_PAGE_TITLE] 		= "Audiences des WebRadios";
	this._fr_text[this.STR_USERNAME_BOX] 	= "Utilisateur";
	this._fr_text[this.STR_PASSWORD_BOX] 	= "Mot de passe";
	this._fr_text[this.STR_CONNEXION]	 	= "Connexion";
	this._fr_text[this.STR_USERNAME] 		= "Nom d'utilisateur";
	this._fr_text[this.STR_REQ_AUTH] 		= "Authentification requise";
	
	this._current_lang = 0;
	
}

LoginPage.prototype.getText = function(str_id){
	
	switch(this._current_lang){
		case 1:
			return this._fr_text[str_id];
		break;
		
		default:
			return this._en_text[str_id];
	}
};

$(document).ready(function() {
    document.title = login_page.getText(login_page.STR_HEAD_TITLE);
    sessionStorage.val_sel_brand = "NRJ";
    $("#PAGE_TITLE").html(login_page.getText(login_page.STR_PAGE_TITLE));
    $("#FORM_USER").attr("placeholder", login_page.getText(login_page.STR_USERNAME_BOX) );
    $("#FORM_PASS").attr("placeholder", login_page.getText(login_page.STR_PASSWORD_BOX) );
    $("#FORM_SUBMIT").html( login_page.getText(login_page.STR_CONNEXION) );
    $("#AUTH_REQ_LABEL").html( login_page.getText(login_page.STR_REQ_AUTH) );
});
