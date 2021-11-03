import TestRenderer from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";

describe('Profile/status comp', () => {
    test('status should be added to state', () => {
        const testRenderer = TestRenderer.create(<ProfileStatus status='hello' updateUserStatusTC={()=>{}}/>)
        const instance = testRenderer.root
        expect(instance.props.status).toBe('hello')
    })
})