import '../../../../assets/styles/socialconnect.scss';
import { LoginSocialGoogle } from 'reactjs-social-login';
const REDIRECT_URI = window.location.href;
import { Row, Col, Card, CardTitle, CardSubtitle, Button } from 'reactstrap';
import React, { useCallback, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { createWorkSpace } from '../../../../requests/Planable';

export const AddGooglepage = (args) => {
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState();
  const [loader, setLoader] = useState(false);

  const handleLogin = (provider, data) => {
    if (provider == 'google') {
      const payloadgoggle = {
        workspacename: name,
        timezone: time,
        googleData: [
          {
            profileName: data.name,
            email: data.email,
            userId: data.sub,
            accessToken: data.access_token,
            profileImg: data.picture
          }
        ]
      };
      setLoader(true);
      createWorkSpace(payloadgoggle)
        .then((response) => {
          // console.log(response);
          if (response.message == 'success') {
            setLoader(false);
            toast.success('Created succesfully');
          }
        })
        .catch((err) => setLoader(false));
    }
  };
  const onLoginStart = useCallback(() => {}, []);
  return (
    <div className="addfbpage">
      <div className="addfbpagemain ">
        <div className="d-flex justify-content-center ">
          <div className=" d-flex">
            <Card
              style={{
                width: '14rem',
                height: '14rem'
              }}
              className="p-2  m-2 "
            >
              <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <AiOutlineHome size={40} color="#6464dd" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    {loader === true ? (
                      <>
                        <h5 style={{ color: '#907e01' }}>Connecting...</h5>
                      </>
                    ) : (
                      <>
                        <LoginSocialGoogle
                          // redirect_uri="http://localhost:3000"
                          redirect_uri="https://mymanager.com"
                          scope="email profile"
                          client_id="194928094285-8pbjlhcaal8ilj07lmkcbcd5pv1ghv7j.apps.googleusercontent.com"
                          client_secret="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"
                          // client_id={process.env.REACT_APP_GG_APP_ID || ''}
                          onLoginStart={onLoginStart}
                          onResolve={({ provider, data }) => {
                            handleLogin(provider, data);
                            setProvider(provider);
                            setProfile(data);
                          }}
                          onReject={(err) => {
                          }}
                        >
                          <span className="txt">Login With google</span>
                        </LoginSocialGoogle>
                      </>
                    )}
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Profile
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
