const userProfile = {
    editingMode : false,
    editUserProfileDetails : function h1() {
        console.log('editingMode in editUserProfileDetails before ',this.editingMode);
        userProfile.editingMode = true;
        console.log('editingMode in editUserProfileDetails after',this.editingMode);
    },
    cancelEditUserProfileDetails : function() {
        console.log('editingMode cancelEditUserProfileDetails before ',this.editingMode);
        userProfile.editingMode = false;
        console.log('editingMode cancelEditUserProfileDetails after',this.editingMode);
    }
}
module.exports = { userProfile };
