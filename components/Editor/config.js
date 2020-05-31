export const config = {
  toolbarSticky: false,
  attribution: false,
  quickInsertTags: [""],
  key:
    "fIE3A-9D2E2G2C4C1B3td1CGHNOa1TNSPH1e1J1VLPUUCVd1FC-22C4A3C3B2D4F2D2C3A2B4==",
  events: {
    "image.beforeUpload": function(files) {
      var self = this;
      if (files.length) {
        // Create a File Reader.
        var reader = new FileReader();

        // Set the reader to insert assets when they are loaded.
        reader.onload = function(e) {
          var result = e.target.result;
          self.image.insert(result, null, null, self.image.get());
        };

        // Read image as base64.
        reader.readAsDataURL(files[0]);
      }

      this.popups.hideAll();

      // Stop default upload chain.
      return false;
    }
  },
  fontFamily: {
    "Poppins, sans-serif": "Poppins (Recommended)",
    "Arial,Helvetica,sans-serif": "Arial",
    "Georgia,serif": "Georgia",
    "Impact,Charcoal,sans-serif": "Impact",
    "Tahoma,Geneva,sans-serif": "Tahoma",
    "Times New Roman,Times,serif,-webkit-standard": "Times New Roman",
    "Verdana,Geneva,sans-serif": "Verdana"
  }
};
