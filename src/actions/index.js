export const CHANGE_PATH = 'CHANGE_PATH';

export const redirectTo = path => ({
    type: CHANGE_PATH, payload: path,
});
