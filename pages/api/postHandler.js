import { addPost, updatePost } from '../../firebase/client'

export default async function handler (req, res) {
    const { method } = req
    const { body } = req

    switch (method) {
        case 'POST':
            try {
                const post = await addPost(body)
                res.status(200).json({success: true, data: post.id})
            } catch (err) {
                res.status(400).json({success: false, data: err})
            }

            break

        case 'PUT':
            try {
                const post = await updatePost(body)
                res.status(200).json({success: true, data: post.id})
            } catch (err) {
                res.status(400).json({success: false, data: err})
            }
    }
}