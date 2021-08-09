import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Menu, Image } from "semantic-ui-react";
import { userLogout } from "../Store/action/authAction";
import UserService from "../services/userService";
import ImageService from "../services/imageService";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router";
export default function SignedIn() {
  let { userId } = useParams();
  const { authItem } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const history = useHistory();
  const [ users, setUsers] = useState({});
  const [ setImages] = useState({});
  useEffect(() => {
    let userService = new UserService();
    userService.getUsers().then((result) => setUsers(result.data.data));
  }, []);
  useEffect(
    (userId) => {
      let imageService = new ImageService();
      imageService
        .getById(userId)
        .then((result) => setImages(result.data.data));
    },
    [userId]
  );



  const handleLogout = (user) => {
    dispatch(userLogout(user));
    history.push("/");
  };

  return (
    <div>
      <Menu.Item>
        <Image avatar spaced="right" src={authItem[0].image?.imageUrl} />
        
        <Dropdown pointing="top right" text={authItem[0].user.name}>
          <Dropdown.Menu>
            {authItem[0].user.userType === 1 && (
              <Dropdown.Item
                as={Link}
                to={`/cvlist/${authItem[0].user.userId}`}
              >
                Cv Güncelle
              </Dropdown.Item>
            )}
            {authItem[0].user.userType === 2 && (
              <Dropdown.Item
                as={Link}
                to={`/employers/${authItem[0].user.userId}`}
              >
                Şirket bilgilerini güncelle
              </Dropdown.Item>
            )}
            <Dropdown.Item onClick={() => handleLogout(authItem[0].user)}>
              {" "}
              Çıkış yap
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}
