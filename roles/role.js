const accesscontrol = require('accesscontrol');
const ac = new accesscontrol();



exports.role=(()=>{

    ac.grant('Guest')
        .readOwn('profile')
        

    ac.grant('BasicUser')
        .extend('Guest')
        .updateOwn('profile')
    
        

    ac.grant('AdminUser')
        
        .extend('BasicUser')
        .create('profile')
        .updateAny('profile')
        .deleteAny('profile')

    return ac
})();