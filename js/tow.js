//滑动tab
function g(o){return document.getElementById(o);}
function HoverLi(n){   
//如果有N个标签,就将i<=N;   
for(var i=1;i<=3;i++){g('tb_'+i).className='normaltab';g('tbc_0'+i).className='undis';}g('tbc_0'+n).className='dis';g('tb_'+n).className='hovertab';   
}   
//如果要做成点击后再转到请将<li>中的onmouseover 改成 onclick;   
//]]>   
//滑动tab 结束


//第二个滑动tab,需要不同的方法名
//第二个滑动tab中的<li>需要更改onclick事件名称与方法名一样
function HoverLi2(n){   
//如果有N个标签,就将i<=N;   
for(var i=1;i<=6;i++){g('tb2_'+i).className='normaltab';g('tbc2_0'+i).className='undis';}g('tbc2_0'+n).className='dis';g('tb2_'+n).className='hovertab';   
}   