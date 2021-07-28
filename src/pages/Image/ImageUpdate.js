import React, { Component } from "react";
import { toast } from "react-toastify";
import { Card, Button } from "semantic-ui-react";
import ImageService from "../../services/imageService";

export default class ImageUpdate extends Component {
    state = {
      selectedFile: null,
    };
  
    fileSelectedHandler = (event) => {
      this.setState({
        selectedFile: event.target.files[0],
      });
    };
  
    fileUploadHandler = () => {
      const fd = new FormData();
      fd.append(
        "multipartFile",
        this.state.selectedFile, 
      );
      let imageService = new ImageService();
      imageService.upload(this.props.userId, fd)
        .then((res) => {
          toast.success(res.data.message);
          this.props.upload();
        })
        .catch((result) => {
          toast.error("olmadı");
        });
    };
  
    render() {
      return (
        <div>
          <Card fluid color={"black"}>
            <Card.Content header="Resim Yükle" />
            <Card.Content style={{}}>
              <input
                style={{ display: "none" }}
                type="file"
                onChange={this.fileSelectedHandler}
                ref={(fileInput) => (this.fileInput = fileInput)}
              />
              <button className="ui button" onClick={() => this.fileInput.click()}>Dosya Seç</button>
              <Button color={"green"} onClick={this.fileUploadHandler} disabled={this.state.selectedFile==null}>Yükle</Button>
            </Card.Content>
          </Card>
        </div>
      );
    }
  }