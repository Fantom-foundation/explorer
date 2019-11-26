// @flow

import * as React from 'react';

const WindowSize = React.createContext<number>(window.innerWidth);

type PageSizeWatcherProps = {
    children: React.Node,
    ...
};

function PageSizeWatcher({ children }: PageSizeWatcherProps) {
    const data = React.useContext(WindowSize);
    const [width, setWidth] = React.useState(data);
    React.useEffect(() => {
        function listenerCreator() {
            let timeoutId: ?TimeoutID = null;
            let lastCall = Date.now();

            return () => {
                let marginCall = Date.now() - 250;

                if (lastCall > marginCall) {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }

                    timeoutId = setTimeout(() => {
                        lastCall = Date.now();
                        timeoutId = null;

                        setWidth(window.innerWidth);
                    }, lastCall - marginCall);
                } else {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                    }

                    lastCall = Date.now();
                    setWidth(window.innerWidth);
                }
            };
        }

        const listener = listenerCreator();

        window.addEventListener('resize', listener, false);

        return () => {
            window.removeEventListener('resize', listener, false)
        };
    }, []);

    return (
        <WindowSize.Provider value={width}>
            {children}
        </WindowSize.Provider>
    );
};

export default PageSizeWatcher;

export {
    WindowSize,
};
