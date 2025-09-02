*
*  Simple GrADS script to draw a colorbar
*
function cbar()
  'query shades'
  shdinfo = result
  if (subwrd(shdinfo,1) = 'None')
    say 'Cannot plot color bar: No shading information'
    return
  endif

  cnum = subwrd(shdinfo,5)
  clevs = ''
  i = 1
  while (i <= cnum)
    clevs = clevs % subwrd(shdinfo,5+i)
    i = i + 1
  endwhile

  'query gxinfo'
  xsiz = subwrd(sublin(result,2),4)
  ysiz = subwrd(sublin(result,2),6)
  ylo = subwrd(sublin(result,4),4)
  xhi = subwrd(sublin(result,3),6)
  xd = xsiz - xhi

  if (ylo < 0.6 & xd < 1.0)
    say 'Not enough room for colorbar'
    return
  endif

  if (ylo < 0.6 | xd > 1.5)
    xl = xhi + xd/2 - 0.4
    xr = xl + 0.2
    xwid = 0.2
    ywid = 0.5
    if (ywid * cnum > ysiz*0.8)
      ywid = ysiz*0.8 / cnum
    endif
    ymid = ysiz/2
    yb = ymid - ywid*cnum/2
    'set string 1 l 5'
    vert = 1
  else
    ymid = ylo/2
    yt = ymid + 0.2
    yb = ymid
    xmid = xsiz/2
    xwid = 0.8
    if (xwid * cnum > xsiz*0.8)
      xwid = xsiz*0.8 / cnum
    endif
    xl = xmid - xwid*cnum/2
    'set string 1 tc 5'
    vert = 0
  endif

  'set strsiz 0.09 0.09'
  i = 1
  while (i <= cnum)
    if (vert)
      ylo = yb + (i-1)*ywid
      yhi = yb + i*ywid
      'set rgb 99 ' % subwrd(shdinfo,2)
      'set line 99'
      'draw rec 'xl' 'ylo' 'xr' 'yhi
      'draw string 'xr+0.05' 'ylo+(ywid/2)' 'subwrd(clevs,i)
    else
      xlo = xl + (i-1)*xwid
      xhi = xl + i*xwid
      'set rgb 99 ' % subwrd(shdinfo,2)
      'set line 99'
      'draw rec 'xlo' 'yb' 'xhi' 'yt
      'draw string 'xlo+(xwid/2)' 'yt+0.05' 'subwrd(clevs,i)
    endif
    i = i + 1
  endwhile
return
