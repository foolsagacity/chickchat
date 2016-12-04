import React, {PropTypes} from "react"
import {connect} from "react-redux"
import attachImage from "src/util/attachImage"

export class ReplyBox extends React.Component {
  onAttachImage = attachImage.bind(this)
    state = {
        text: ""
    }

    updateText = (e) => {
        this.setState({text: e.target.value})
    }

    sendReply = () => {
      console.log(this.state.text)
        this.props.replyText(this.state.text)
        this.setState({data: ""})
    }
    sendImage = () => {
      console.log(this.state.data)
        this.props.replyImage(this.state.data)
        this.setState({text: ""})
}

    render () {
        return (
            <div>
              <input value={this.state.text} onChange={this.updateText}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  this.sendReply()}}}/>
              <button onClick={this.sendReply}>Send</button>
<input type="file" onChange={this.onAttachImage} />
            </div>
        )
    }
}

ReplyBox.propTypes = {
    replyImage: PropTypes.func,
    replyText: PropTypes.func
}

export default connect(undefined, {
    replyText: (text) => ({
        type: "REPLY",
        apiEndpoint: "chatPOST",
        payload: {text}
    }),
    replyImage: (data) => ({
        type: "REPLY",
        apiEndpoint: "chatPOST",
        payload: {data}
    })
})(ReplyBox)
