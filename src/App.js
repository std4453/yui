import React, { useState } from 'react';
import Logo from './Logo';
import Stack from './Stack';
import testData from './test.json';
import Breadcrumb from './Breadcrumb';

function App() {
    const [data] = useState(testData);
    const [focused, setFocused] = useState(null);
    return <>
        <Logo/>
        <Breadcrumb focused={focused}/>
        <Stack data={data} setFocused={setFocused}/>
    </>;
}

export default App;