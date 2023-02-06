import { Router } from 'express';

const router = Router();

router.get('/', (req, res)=>{
    res.render('index',{
        title: 'App de chat'
    })
});

export default router