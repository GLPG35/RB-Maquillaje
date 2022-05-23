import styles from '../../public/scss/post_modal.module.scss'
import Backdrop from '../backdrops/backdrop'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { uploadImage } from '../../firebase/client'
import { getDownloadURL } from 'firebase/storage'
import Spinner from '../spinners/spinner'

const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.2,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: '100vh',
        opacity: 0
    }
}

const PostModal = ({ handleClose, thumbnail, title, price, description = null, pid }) => {
    const [desc, setDesc] = useState(description)
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState(null)
    const [max, setMax] = useState(180 - (description && description.length))
    const [upload, setUpload] = useState(false)

    useEffect(() => {
        fetch(thumbnail, {
            method: 'GET'
        })
        .then((res) => res.blob())
        .then((blob) => {
            blob.name = thumbnail.split('/').pop().split('%2F').pop().split('?').shift()
            setImage(new File([blob], blob.name))
            setImageName(blob.name)
        })
    }, [])

    const imagePreview = (e) => {
        if (e.target.files[0]) {
            const img = new Image
            img.onload = convert
            img.src = URL.createObjectURL(e.target.files[0])
            img.name = e.target.files[0].name.split('.')[0]
        }
    }

    function convert() {
        URL.revokeObjectURL(this.src)

        const c = document.createElement('canvas'), ctx = c.getContext('2d')
        c.width = this.width
        c.height = this.height
        ctx.drawImage(this, 0, 0)

        c.toBlob((blob) => {
            setImage(new File([blob], imageName))
        }, 'image/jpeg', 0.60)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const eThumb = image
        const eTitle = e.target.title.value
        const ePrice = e.target.price.value
        const eDesc = e.target.description.value.length ? e.target.description.value : undefined

        const task = uploadImage(eThumb, eThumb.name)

        task.on('state_changed',
            () => {
                setUpload(true)
            },
            (err) => {
                console.log(err)
            },
            () => {
                getDownloadURL(task.snapshot.ref)
                .then((url) => {
                    const body = {
                        pid,
                        eThumb: url,
                        eTitle,
                        ePrice,
                        eDesc
                    }

                    fetch('/api/postHandler', {
                        method: 'PUT',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => res.json())
                    .then((response) => {
                        setUpload(false)
                    })
                })
            }
        )
    }

    return (
        <Backdrop onClick={handleClose}>
            {upload && <Spinner />}
            <motion.div variants={dropIn} initial='hidden'
            animate='visible' exit='exit' onClick={(e) => e.stopPropagation()}
            className={styles.modal}>
                <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                className={styles.send} form='editPost'>
                    <i className='fas fa-paper-plane'></i>
                </motion.button>
                <div className={styles.pic}>
                    <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                    onClick={() => HTMLInputElement.click()} className={styles.editPic}>
                        <i className='fas fa-pencil'></i>
                    </motion.button>
                    <img src={!image ? thumbnail : URL.createObjectURL(image)} />
                </div>
                <div className={styles.info}>
                    <form id='editPost' onSubmit={handleSubmit}>
                        <input type="file" name='thumbnail' accept='image/jpeg, image/png, image/webp' className={styles.upThumb}
                        ref={(input) => {HTMLInputElement = input}} onChange={imagePreview} />
                        <input type="text" className={styles.title} name='title' placeholder='Título' defaultValue={title} />
                        <input type="number" name='price' className={styles.price} placeholder='Precio' defaultValue={price} />
                        <div className={styles.textarea}>
                            <textarea name="description" placeholder='Descripción'
                            onChange={(e) => {setDesc(e.target.value), setMax(180 - e.target.value.length)}}
                            onKeyDown={(e) => {if (max == 0 && e.key !== 'Backspace') e.preventDefault()}}
                            autoComplete='off'>
                                {description}
                            </textarea>
                            <span>{max}</span>
                        </div>
                    </form>
                </div>
            </motion.div>
        </Backdrop>
    )
}

export default PostModal