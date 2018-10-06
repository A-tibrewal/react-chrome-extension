import $ from 'jquery';

class Scrapper {


    static getValueFromElement(classname) {
        var value = (document.querySelector('.' + classname) && document.querySelector('.' + classname).textContent) || '';
        value = value.trim();
        return value;
    }
    
    
    static getPosition( position ){
        position = position.toLowerCase();
        if( (position.indexOf('backend') != -1)  || (position.indexOf('software developer') !== -1) ){
            return 'Backend Engineer'
        } else if( position.indexOf('frontend') != -1 ){
            return 'Frontend Engineer';
        } else if( position.indexOf('data scientist') != -1 ){
            return 'Data Scientist';
        } else if( position.indexOf('ios') != -1 ) {
            return 'iOS Engineer';
        } else if( position.indexOf('android') != -1 ){
            return 'Android Engineer';
        } else if( position.indexOf('engineering leadership') != -1 ){
            return 'Engineering Leadership';
        } else {
            return 'Other';
        }
    }

    static getDegree(degree){
        degree = degree.toLowerCase();
        if( degree.indexOf('bachelor') != -1 || degree.indexOf('b.tech') != -1 ||  degree.indexOf('b.e') != -1 ){
          return 'BE/B.Tech/BS';
        } else if( degree.indexOf('master') != -1 || degree.indexOf('m.tech') != -1 ||  degree.indexOf('m.e') != -1 ){
          return 'ME/M.Tech';
        } else if( degree.indexOf('phd') != -1 ){
          return 'PhD';
        } else if( degree.indexOf('application') != -1 || degree.indexOf('bca') != -1 || degree.indexOf('mca') != -1  ){
          return 'MCA/BCA';
        } else if( degree.indexOf('mba') != -1 ){
          return 'BE + MBA'
        } else {
          return 'Other';
        }
    }


    static getField(field){
        field = field.toLowerCase();
        if( field.indexOf('computer') != -1 ){
            return 'Computer Science';
        } else if( field.indexOf('Mathematics') != -1 ){
            return 'Mathematics and Computingh';
        } else if( field.indexOf('Electronics') != -1){
            return 'Electronics';
        } else if( field.indexOf('Mechanical') != -1 ){
            return 'Mechanical';
        } else if( field.indexOf('Electrical') != -1 ){
            return 'Electrical';
        } else {
            return 'Other';
        }
    }


    static getProfileData(){
        let location = window.location;
        let profileData;
        if ( (/\/in\/[\w-]+\//g).test(location.pathname) ){
            profileData = Scrapper.getLinkedInData();
        } 
        else if ( location.href.indexOf('resdex.naukri.com/v2/preview/preview') === -1 ) {
            profileData = Scrapper.getNaukriData();
        } else {
            return { success: false, message: 'Not a Profile Page' }
        } 

        profileData.position = Scrapper.getPosition(profileData.position);
        profileData.field = Scrapper.getPosition(profileData.field);
        profileData.degree = Scrapper.getPosition(profileData.degree);
        return {
            success: true,
            message: 'Imported !!',
            profileData: profileData
        }
    }


    
    
    

    static getLinkedInData() {
        let location = window.location;
        if (location.hostname.indexOf('linkedin') === -1) {
          return '';
        }
        var data = {};
        data.source = "linkedin";
        data.name = Scrapper.getValueFromElement('pv-top-card-section__name');
        data.company = Scrapper.getValueFromElement('pv-entity__secondary-title');
        data.university = Scrapper.getValueFromElement('pv-entity__school-name');
        data.location = Scrapper.getValueFromElement('pv-top-card-section__location');
        data.orgyear = document.querySelectorAll('.pv-entity__dates time').length && document.querySelectorAll('.pv-entity__dates time')[1].textContent
        data.email = Scrapper.getValueFromElement('ci-email .pv-contact-info__contact-link');
        data.degree = Scrapper.getValueFromElement('pv-entity__secondary-title.pv-entity__degree-name .pv-entity__comma-item');
        data.field = Scrapper.getValueFromElement('pv-entity__secondary-title.pv-entity__fos .pv-entity__comma-item');
        data.position = Scrapper.getValueFromElement('pv-top-card-section__headline');
        return data;
    }

    static getNaukriData() {
        let location = window.location;
        if (location.hostname.indexOf('resdex') === -1) {
          return {};
        }
        var data = {};
        data.source = "naukri";
        data.name = Scrapper.getValueFromElement('bkt4.name.userName');
        data.company = Scrapper.getValueFromElement('cOrg .cOrg.bkt4');
        data.university = Scrapper.getValueFromElement('pgIns') || Scrapper.getValueFromElement('ugIns');
        //data.summary =  (document.getElementsByClassName('pv-top-card-section__summary')).length ? (document.getElementsByClassName('pv-top-card-section__summary')[0]).textContent : '';
        data.location = $('.locInfo').text().match(/[a-z]+/gi).pop();
        data.orgyear = Scrapper.getValueFromElement('education-inner .detail') && 
        Scrapper.getValueFromElement('education-inner .detail').match(/([0-9]+)/gi)[0];
        data.degree = Scrapper.getValueFromElement('education-inner .deg');
        data.base_ctc = Scrapper.getValueFromElement('salInfo').match(/([0-9\.]+)/gi)[0];
        data.field = Scrapper.getValueFromElement('education-inner .deg');
        data.position = Scrapper.getValueFromElement('pv-top-card-section__headline') && 
        Scrapper.getValueFromElement('pv-top-card-section__headline').split('at')[0].trim();
        data.email = Scrapper.getValueFromElement('bkt4.email');
        data.phone_number = document.querySelector('#ltDiv').parentNode.innerHTML.match(/[978][\d]{9}/)[0];
        data.notice_period = document.querySelectorAll('.innerDetailsCont .desc')[2] && 
        document.querySelectorAll('.innerDetailsCont .desc')[2].textContent.trim();
        console.log( data );
        return data;
    }      

}

export default Scrapper;