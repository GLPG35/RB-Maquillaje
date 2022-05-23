import useUser from '../../hooks/useUser'
import styles from '../../public/scss/create.module.scss'
import DashboardLayout from '../../components/layouts/dashboard'
import PreviewProduct from '../../components/cards/preview_product'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { uploadImage } from '../../firebase/client'
import Spinner from '../../components/spinners/spinner'
import { getDownloadURL } from 'firebase/storage'

const Create = () => {
    const [thumb, setThumb] = useState(null)
    const [title, setTitle] = useState(null)
    const [price, setPrice] = useState(null)
    const [desc, setDesc] = useState(null)
    const [max, setMax] = useState(180)
    const [upload, setUpload] = useState(false)
    const user = useUser()

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
            setThumb(new File([blob], this.name))
        }, 'image/jpeg', 0.60)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const file = thumb
        const title = e.target.title.value
        const price = e.target.price.value
        const description = e.target.description.value.length ? e.target.description.value : undefined

        const task = uploadImage(file)
        
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
                        thumbnail: url,
                        title,
                        price,
                        description
                    }

                    fetch('/api/postHandler', {
                        method: 'POST',
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
        <DashboardLayout user={user} current='create'>
            {upload && <Spinner />}
            <div className={styles.create}>
                <div className={styles.content}>
                    <h2>Contenido</h2>
                    <form onSubmit={handleSubmit}>
                        <input type='file' name='thumbnail' accept='image/jpeg, image/png, image/webp' className={styles.upThumb}
                        ref={(input) => {HTMLInputElement = input}} onChange={imagePreview} required />
                        <motion.button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}
                        className={styles.imageUp} type='button' onClick={() => HTMLInputElement.click()}>
                            Subir <i className='fas fa-image'></i>
                        </motion.button>
                        <input type='text' name='title' placeholder='Título' className={styles.title}
                        onChange={(e) => setTitle(e.target.value)} required autoComplete='off' />
                        <input type='number' name='price' placeholder='Precio' className={styles.price} min='1' max='9999'
                        onKeyDown={(e) => {if (price && price.length == 4 && e.key !== 'Backspace') e.preventDefault()}}
                        onChange={(e) => setPrice(e.target.value)} required autoComplete='off' />
                        <div className={styles.textarea}>
                            <textarea name='description' placeholder='Descripción'
                            onChange={(e) => {setDesc(e.target.value), setMax(180 - e.target.value.length)}}
                            onKeyDown={(e) => {if (max == 0 && e.key !== 'Backspace') e.preventDefault()}}
                            autoComplete='off'></textarea>
                            <span>{max}</span>
                        </div>
                        <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                        className={styles.submit} type='submit'>
                            Crear <i className='fas fa-plus-circle'></i>
                        </motion.button>
                    </form>
                </div>
                <div className={styles.preview}>
                    <h2>Preview</h2>
                    <PreviewProduct thumb={thumb} title={title} price={price} desc={desc} />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Create