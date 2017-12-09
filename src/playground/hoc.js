// A Higher Order Component (HOC) - A component (HOC) that renders another component

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is :{props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin && <p>This is information is private and dont share it.</p>}
            <WrappedComponent {...props}/>
        </div>
    );
}

// requireAuthentication

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAuthenticated ?  (
                <WrappedComponent {...props}/>
            ) : (
                <p>Please Login to view the info</p>
            )}
        </div>
    );
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="There some details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="There some details" />, document.getElementById('app'));