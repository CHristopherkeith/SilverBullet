# SilverBullet

## 一、APP说明
基于区块链的射击练习游戏  

1.功能设计  
1.1.准确度Exact Aiming：分数  
1.2.敏捷度Press Reaction：时间  

2.代码设计  
2.0.界面设计  
2.1.目标实例  

前端实现1：非mvvm框架：  
1.目标实例为一个dom对象（绑定在js实例对象内）  
2.空间为普通的html dom对象（可静态创建）  
3.射击事件由js实例对象监听  
4.目标实例状态由js实例对象改变  
5.射击事件成功改变目标组件状态，同时改变积分状态  

前端实现2：mvvm框架：  
1.目标实例为一个html组件  
2.空间为一个html组件  
3.射击事件绑定在目标组件上  
4.目标组件状态（出现、消失）与某些状态值绑定  
5.射击事件成功改变目标组件状态，同时改变积分状态  

2.2.子弹实例（射击事件实例）  
2.3.计分（时间）机制  
2.4.结果存储  
2.4.1.上链机制  
2.4.2.排名机制  
2.4.3.pk机制（选）  

## 二、前端代码  
前端使用mvvm框架vue  
根目录下运行  
1.安装依赖：npm install  
2.构建：  
2.1.开发模式：npm run dev  
2.1.生产模式：npm run build  

## 三、智能合约   
1.智能合约采用星云链作为部署公链，合约代码见contract文件夹  
1.1.合约地址（测试网已部署）  
n1jT2w44HcCUtWrR8RxVuwVpk89KhN15GUC  
1.2.部署txhash  
2.智能合约设计：    
2.1.合约数据结构  
2.1.1.计分对象  
ScoreContent:  
{  
    exactScore: null,  
    exactMisses: null,  
    exactMissesTgt: null,  
    pressScore: null,  
    pressMisses: null,  
    pressMissesTgt: null  
}  
SilverBulletContract:  
{  
    userAddress1: JSON.stringify(ScoreContent1),  
    userAddress2: JSON.stringify(ScoreContent2),  
    ......,  
    userAddressN: JSON.stringify(ScoreContentN),  
}  
3.部署到区块链......  
4.钱包安装......  

## 四、疑问  
1.游戏加密？    
2.击中目标时增加效果提示？  
3.激励机制？  
4.成功后刷新分数？  