import React from 'react';
import steem from 'steem';
import { connect } from 'react-redux';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            title: '',
            tagFirst: '',
            tagSecond: '',
            tagThird: '',
            tagFouth: '',
            tagFifth: '',
        };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        const _this = this;
        const wif = this.props.postingKey;
        const permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
        const author = this.props.username;
        const tags = this._getTags();
        const jsonMetadata = {
            tags: tags,
            app: 'steepshot/0.0.5' //@TODO get metadata from Backend
        };

        /** Broadcast a post */
        steem.broadcast.comment(
            wif,
            '', // Leave parent author empty
            tags[0], // Main tag
            author, // Author
            permlink + '-post', // Permlink
            this.state.title, // Title
            this.state.file, // Body
            jsonMetadata, // Json Metadata
            function(err, result) {
              console.log(err, result);
            }
        );
    }

    _getTags() {
        let tags = [];
        const tagsNames = ['tagFirst', 'tagSecond', 'tagThird', 'tagFouth', 'tagFifth'];

        tagsNames.forEach((tagName) => {
            if (this.state[tagName]) {
                tags.push(this.state[tagName]);
            }
        });

        return tags;
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    _getPostImageStyles(itemImage) {
        return {
        backgroundImage: `url(${itemImage})`, 
        backgroundPosition: 'fixed', 
        backgroundRepeat: 'no-repeat', 
        backgroundOrigin: 'center', 
        backgroundClip: 'content-box', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
        };
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="preview-text">Please select an Image for Preview</div>);
        }

        return (
        <div className="preview-component">
            <div className="image-block">
                <label>Image preview</label>
                <div className="img-preview">
                    {$imagePreview}
                </div>
            </div>
            <div className="post-info">
                <div className="info-block">
                    <label>Title</label>
                    <input placeholder="Input titile" type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange.bind(this)}/>

                    <label>Input tags</label>
                    <input placeholder="Input first tag and main tag" type="text" name="tagFirst" id="tagFirst" value={this.state.tagFirst} onChange={this.handleChange.bind(this)}/>
                    <input placeholder="Input second tag" type="text" name="tagSecond" id="tagSecond" value={this.state.tagSecond} onChange={this.handleChange.bind(this)}/>
                    <input placeholder="Input third tag" type="text" name="tagThird" id="tagThird" value={this.state.tagThird} onChange={this.handleChange.bind(this)}/>
                    <input placeholder="Input fouth tag" type="text" name="tagFouth" id="tagFouth" value={this.state.tagFouth} onChange={this.handleChange.bind(this)}/>
                    <input placeholder="Input fifth tag" type="text" name="tagFifth" id="tagFifth" value={this.state.tagFifth} onChange={this.handleChange.bind(this)}/>

                    <label>Choose you photo</label>
                    <input className="file-input" 
                        type="file"
                        onChange={(e)=>this._handleImageChange(e)} />
                </div>
                <button className="submit-button" 
                        type="submit" 
                        onClick={(e)=>this._handleSubmit(e)}>Create post</button>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    localization: state.localization,
    username: state.auth.user,
    postingKey: state.auth.postingKey
  };
};

export default connect(mapStateToProps)(CreatePost);