import React from 'react';
import {connect} from 'react-redux';
import {setPostModalOptions} from '../../../actions/postModal';
import constants from '../../../common/constants';

class PostModal extends React.Component {
  
  constructor(props) {
    super(props);
    this.setComponentSize = this.setComponentSize.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.setComponentSize);
    this.setComponentSize();
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.setComponentSize);
  }
  
  render() {
    return (
      <div className="container_pos-mod"
           ref={ref => this.container = ref}>
        <div className="image-container_pos-mod"
             ref={ref => this.imgCont = ref}>
          <button title="Share this post"
                  className="btn btn-default btn-xs">
            Share post
          </button>
          <img src={this.props.post.body || constants.NO_IMAGE}
               alt="Post picture."
               ref={ref => this.image = ref}/>
        </div>
        <div className="header_pos-mod"
             ref={ref => this.headerContainer = ref}>
          title
        </div>
        <div className="description_pos-mod"
             ref={ref => this.descContainer = ref}>
          test
        </div>
      </div>
    );
  }
  
  setComponentSize() {
    const DESC_WIDTH = 380;
    const MIN_HEIGHT = 440;
    const PREF_IMG_WIDTH = 640;
    const CONT_MARGIN = 80;
    
    let imgHeight = this.image.naturalHeight;
    let imgWidth = this.image.naturalWidth;
    let docWidth = document.documentElement.clientWidth;
    let docHeight = document.documentElement.clientHeight;
    if ( docWidth > 815) {
      let contHeight  = docHeight * 0.9 > MIN_HEIGHT ?
        docHeight * 0.9 : MIN_HEIGHT;
      
      imgWidth = imgWidth < PREF_IMG_WIDTH ?
        imgWidth : PREF_IMG_WIDTH;
      imgWidth = imgWidth < docWidth - DESC_WIDTH - CONT_MARGIN ?
        imgWidth : docWidth - DESC_WIDTH - CONT_MARGIN;
      
      imgHeight = imgHeight * imgWidth / this.image.naturalWidth;
      
      if (imgHeight > contHeight) {
        imgWidth = imgWidth *  contHeight / imgHeight;
        imgHeight = contHeight;
      }
      
      this.image.style.width = imgWidth + 'px';
      this.imgCont.style.height = imgHeight + 'px';
      
      this.container.style.width = imgWidth + DESC_WIDTH + 'px';
      this.container.style.height = contHeight + 'px';
      
      this.imgCont.style.height = '100%';
      this.imgCont.style.width = imgWidth + 'px';
      
      this.descContainer.style.width = DESC_WIDTH + 'px';
      this.headerContainer.style.width = DESC_WIDTH +'px';
      this.headerContainer.style.order = 2;
    } else {
      this.container.style.height = '100%';
      this.container.style.width = docWidth + 'px';
      this.imgCont.style.height = '100%';
      this.imgCont.style.width = '100%';
      imgWidth = imgWidth < document.documentElement.clientWidth ?
        imgWidth : document.documentElement.clientWidth;
      this.image.style.width = imgWidth + 'px';
      imgHeight = imgHeight * imgWidth / this.image.naturalWidth;
      this.imgCont.style.height = imgHeight + 'px';
      
      this.descContainer.style.width = '100%';
      this.headerContainer.style.width = '100%';
      this.headerContainer.style.order = 0;
    }
  }
  
}

const mapStateToProps = (state) => {
  let currentIndex = state.postModal.currentIndex;
  return {
    postModal: state.postModal,
    post: state.posts[currentIndex],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPostModalOptions: options => {
      dispatch(setPostModalOptions(options));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
