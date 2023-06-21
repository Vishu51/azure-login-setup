const Pagenation = {
  components: {},
  props: {},
  data () {
    return {
      goToPageInput: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    goTenPageBackwards (page, goToPageCallBack) {
      if (!page) return
      page = Number(page) - 10
      if (page < 1) return
      goToPageCallBack.call(this, page)
    },
    goTenPageForward (page, goToPageCallBack, totalPage) {
      if (!page || !totalPage) return
      page = Number(page) + 10
      if (page > totalPage) return
      goToPageCallBack.call(this, page)
    },
    goToPage (page, goToPageCallBack, totalPage) {
      if (!page || !totalPage) return
      if (page > totalPage || page < 1) return
      goToPageCallBack.call(this, page)
    }
  }
}

export default Pagenation
