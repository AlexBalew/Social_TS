import TestRenderer, { act } from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";

describe('Profile/status comp', () => {
    test('status should be added to state', () => {
        const testRenderer = TestRenderer.create(<ProfileStatus status='hello' updateUserStatusTC={()=>{}}/>)
        const instance = testRenderer.root
        expect(instance.props.status).toBe('hello')
    })
    test('after creation status should be displayed as <span>', () => {
        const testRenderer = TestRenderer.create(<ProfileStatus status='hello' updateUserStatusTC={()=>{}}/>)
        const instance = testRenderer.root
        const span = instance.findByType('span')
        expect(span).not.toBeNull()
    })
    test('after creation input shouldn\'t be displayed', () => {
        const testRenderer = TestRenderer.create(<ProfileStatus status='hello' updateUserStatusTC={()=>{}}/>)
        const instance = testRenderer.root
        expect(() => {
            const input = instance.findByType('input')
        }).toThrow()
    })
    test('view mode should be changed by onDoubleClick', () => {
        const testRenderer = TestRenderer.create(<ProfileStatus status='hello' updateUserStatusTC={()=>{}}/>)
        const instance = testRenderer.root
        const span = instance.findByType('span')
        act(() => span.props.onDoubleClick())
        const input = instance.findByType('input')
        expect(instance.findByType('input')).toBeTruthy()
        expect(() => {
            const span = instance.findByType('span')
        }).toThrow()
        expect(input.props.value).toBe('hello')
    })
})