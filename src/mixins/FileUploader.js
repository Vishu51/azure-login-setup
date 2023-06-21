import codes from '@/plugins/codes'

const FileUploader = {
  props: {
    btnDisabledFileUpload: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cloudMode:
        process.env.VUE_APP_PRODUCTION_TYPE === codes.productionTypes.CLOUD,
      file: null,
      files: [],
      filesToUpload: [],
      fileUploadVisible: false
    }
  },
  methods: {
    cancelFileUpload () {
      this.file = null
      this.files = []
      this.filesToUpload = []
      this.toggleFileUpload()
      this.afterCancelFileUpload()
    },
    afterCancelFileUpload () {
      // Do something like clean input fields.
    },
    toggleFileUpload () {
      this.fileUploadVisible = !this.fileUploadVisible
    },
    appendFiles () {
      this.filesToUpload = [...this.filesToUpload, ...this.files]
      this.files = []
    },
    removeFile (fileName) {
      this.filesToUpload = this.filesToUpload.filter(
        file => file.name !== fileName
      )
    }
  }
}

export default FileUploader
