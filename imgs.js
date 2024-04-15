const imgs = {
	startSlideshowFromStart:
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwklEQVR4nO3a30tacRjH8U9pkJ11hMnQFWtC4SjGdtUSKglWuauxixGMXXXdHxZ4wKusZD9wjrW5CwlEMJsgi1lbG0xFjfXj7GrhcPro8dhzBs8Lzo14vj28+XryHOwDoEM01c89gNVJIIIEIkggggQiSCCCBCJIIIIEItiNnqhpmplz9IyqqggGg4bPNxxIVdWG10qlIoaHhw0P0w1dB3T9HDbbwF+vVyqV7tc244hGo7qmhUxZy8ixvb2lb25u6D6fz9R15RpEYA0UeLbI+efbwhroaKQC/9oSfFN3OMdoiTWQ9+44LiYHMRC8gfmnDzlHaYo1kNvpwpOZZYze8+Lr7Sr8a0vwjNzkHKkB+0V69LobzwOPMb8wh4vJQbhWJuB/NMc91iXD34PMFpiaxrhnDDElgbwth9mxZeQ2UjgqHLLOxb6D6v3ZTTOzD1CZ6odrZQLTC37WmSyzg+ot3p+F130Lrwd3cGw7BGJ8s1guUPogi1gqgZ/57/AUFGTX37POY5lAxWoZO5kkkh+SUH8NwZE4QfwjbxzAIoHSB1m8yyRxvH8IT0FBfP0l90iX2ANtJd8g8yUH5E/g3NURj1knDsAcKPV5D9WDItzfrmH/1R77v/R/YQ10mq/AuavjbewF5xgtsQb6EfqEtAV3TT3eu3mLxwEs9k3aikz7iJ2dnaFWq0LTQmYt2ZFyuQyHY8j0dftg4u+DIpEI7Hbjzc/PTxseuneiUChgdXXV8PnNsD1orz+i0WhPHrp3e8g1iCCBCBKIIIEIEogggQgSiCCBCBKIIIEIEogggQim3s23Eg6HoShKy/e0czffze8NjbiyR66KoqBUKrXxzlrPZ+nEle2g/5VcgwgSiCCBCBKIIIEIEogggQgSiCCBCBKIIIEIEogggQgSiCCBCBKIIIEIEogggQgSiCCBCBKIIIEIvwG2HDiXbSz1TwAAAABJRU5ErkJggg==',
	startSlideshowFromCurrent:
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB/0lEQVR4nO3aQU7CQACF4adikFITFy44gC6NazaiQVcYbuDpPIJVNhCoGw7gJViYaOhQQap1bZA8O22hkPclbJqZyeQPTEphB0AMWWp33RsoOgUiFIhQIEKBCAUiFIhQIEKBiJLtxKcnD/EG3IO77iEajYb1fOtA1erhwrUgGMN1XevNpBHHQBhO4Lq/9xWGYfq1s3j5vh973kMma9m8BoN+/PjoZb6uziBCgQjrM4h6eU00vP/9hqvz05w2Yy+/QADuyyXUynt03M3488/rvW6Xzp2EIdrtduK9/VeugWrlPZwcHfCBSwLt7/PtVR0n6bYSyTVQWheNy3VvQYc0o0BEoT9iz/6AjpnPIzSvr3PbQ6ED6QzaALm+g0azL+B9aj1/6++D7mYRMIus52/3fdDZcaLhV39c0xm0ARSIUCBCgYjMDukoijCdfsDzHrJaMhFjDCqVSubrZhao2Wyi1+uhVLJf0phg4aF7EqPRyHruMjsoyB+ofN+HMQFardt1b+UXnUGEAhEKRCgQoUCEAhEKRCgQoUCEAhEKRCgQsbIvq51OBw55wP6fb/Np/m9oY2U/HDqOA2MCOo6NqdfrGA6HWW2LKszjjqLSGUQoEKFAhAIRCkQoEKFAhAIRCkQoEKFAhAIRCkQoEKFAhAIRCkQoEKFAhAIRCkQoEKFAxA/BnbYLNwmMhAAAAABJRU5ErkJggg==',
	endSlideshow:
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFPElEQVR4nO2aX2hTVxjAf2m7WLViquhQ25rFDYX5Z7QOZD5YQVxni10fMgt9KJTRBx0MfZmgMAUF2YNugk5EnRR8sH0wQd1DK6zZ6LpqC6H+QYZ00tYIOmhT29om8Z49HNsmTdrT3pvYdJwfXG7v13Pv+fjlu/e79yY2QKCZkoy5TiDd0YIUaEEKtCAFWpACLUiBFqRAC1KgBSnIMrvj2rVruXDh55iYYRjYbDZsNpvlxMxiGAYZGROf+4IF2dTV1XH16lVTxzMtKBgMcv16/fh2RUUFg4ODtLX9xcDAK7OHNY3D4aC4eAfDw69pbGwcj0ciETo7O00f17Sg/v7+mE9l586dDA0N4vF46e7uNp2QWZxOJ1u2bGFk5LXpakmEvgYp0IIUmD7FlHy6HbZun/FwBwbOe3/gb29LWUpmSJ2grdt5/8B3HMnOYlHm9F3NG3rD/VCYT86Nxgi6fOmScppIJMKx48ctpzsVqRME2G2wcUEmS+2Z0467K+B+KBwXd7lcyjkibyLY7XbTOapIqaAMYKk9k2XZ00+zaPRNwnhNTY1yDgEEAgHWrFljIkM1KRVklX+ePp3rFHQXU5HWFeRr/i1mOyMcZmEgAMAqj4fVNzwAVADD4TC5gWc8X7YsqTmktaDLV34BYCWwH3gvGCTP640bdwPg2TM4cpT2slKKgeYk5ZDWgurq6gAoBz6Y4T5bb93GDfQCT5KQQ0oFGUAwlLhDRTMcMRLGv967l5U+HyeDwVnNux9wA19hvZJSKui5IageGFV2gqAAR4LvL39qbyd7eNjU3CuAeuAzrFVS6gS1txA5/wM9M95B4G+/GxNZGAgQdw9eVARdXdDXFxuvrZXrixfHQyuAb4EG4PcZ5xFL6gTda5HLDOkH/FHbHoiXk58Pp07B0BBcuwYNDTJ++jTs2CH/3rABDh0a3+UA8C/pKMgiH04OuN1QVQXr18PoKBw9Ci9ewLZtsHs35OVBb2/ccay+20xbQXHcuSOFnD0LTicEg3DwICxePCEnFIIzZ5I67fy5k+7rA58PTpyAR48gKwvKy2HXLnkP1Ngot3vir3rHgI0mp01aBRmGQU5ODqWlewjOsi0nYuntX2WVTKarCwYH4+OtrYnjFkmaoN7eXjZt2khZWZnpbzWEEOP7Olpa4gXZ7bJiVq2S2yMjE/GqKnkK+nxxx30BjJrKSF7DkvYDqurqatNycnNz2bPnC27evMXAwAAnvV5WR7fyoiIpp6YGliyBV6/gyhVYtw5KSuSYvj55Co51t7ccA6y8UhPpsDidTtHU1CgKCgoEIDwgRPRSWytER4cQ3d1CPHggRFOTEPn5QrjdQrS2CtHfL+MNDbH7gfjeQl5p28W+RD6qjNdjR4esDLcb6utlV+vpmbgoHz4s15Oq5xwQf9LNjjmvHhJUECDKQfwdXQ12uxAul1xPrjCXSy6T4h9bzCut2/yfwI/RgVBIdrFQKH5wV5dcomgGXlrMIa0FvQTOI0+32fIE2IfsYFZIa0FjeJHPVA9RV8RD4BvgI6zLgXkiCOQT+b636+mYyZjZMG8EvURWxwFkZ5tqeUhyKmeMeSNortCCFGhBCrQgBe/sUWPz5s0UFhZO+X+HwwHIn/JN97rE7/fj9/uTnN3UvDNBhYWFVFZWIkTir3gAwuEwJSWfT3uc5cuX8/jxY0bGXnWkmKS+7vg/oq9BCrQgBVqQAi1IgRakQAtSoAUp0IIUaEEKtCAFWpACLUiBFqRAC1KgBSnQghRoQQq0IAVakAItSIEWpEALUqAFKfgPK5UtoN/4uLsAAAAASUVORK5CYII=',
	laser:
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFm0lEQVR4nO2av4tdRRTHP2/3bTSB2MQ1MRZGUBcRCYgxYqWFCwEbEf8Bi4hoExS000oQgsHCTiwUKxELNYvFFjb+iKIs2MSIPwpd1AUX3WR/vLfvWsw53PNm77tzf8x9bGC+MLz5ce7Mme+cOXPm3geQxU4XIcskVZHvi+yoonwd2bapJ5noGAB9yfcqyKtGMxXkqvYZAyF9GmOuq47paEUnoDOCAJ6R36oT8q3CL2s/nSpdoEOnCzIin6idsL9VVE7LukX9Z6psw5jofCw7wDGT91fFt5ZZr9zUegY15X1MZTEW5HfV1P0sv5PMN4YTzsgPiqaYCkE/mryu6F0l8r5SI/ldNHVlxI5Me1v/0dgHZdRf5TK/47dpeRbYndBm6zQ/mtDWFI0syK5OGbsDaX9Dyv4Eiyasz2n7UPKLXptdICUmNjmKRhFmVpB8mbsL2jU/8MoafZ+SKDlzUezYs4OCKDqkQ9vU+pgvenhS/KJt1oJ0m60BNzNuGZO2cQ9n+kNPtguHGi0OKiOqz/jWmDHydX1ZkcJdXjuikW6DPEWGI2aIu3ooGU19hf9s3eebILpVqvkr+uRE+duiLnzH7PdzsWG/ZegkDtKJzJGfQlrfNnCD4utHBpwBnorQvz9W1LuY7exB4JuC+i7Q1UU2an/veeVLOMVtZBsTGe6NgW7rrq4F0WMHTQMT08RMpyRGsmO97MnYmMlPj00zDqqKGWCbOD4oBqoeFLWs0k7uLO7U0C00MHndUnZ77RKPHF1RewCsAbfiJn6J/JTTw2LGq6uKWhbUxtTqBoRlWACuMB3Tr2VBQy+/xPiqTEqzxA3oLpNbZlcHgKJTH2S/bEwLse9k0U9G9UV+UHiBelakfdiyhR7voRf9bRHdgvSutMv4px+9tZfd7P2bvA8/GOzqBm8RvX8N2OZMeZfcX5z2yva0s2lSYDIrfdrTcdjFRASd+qBrjG+zG4EN2vulAya/zfhr2wOFTzRHZxa6iVN6FziCU/wq+WvUQ9LWJG2acW7AHflDnFVtEmcRFNEJWscpqKZ/CPgP+I18gjfhArtd4E/GJz8EDpr8YdN2GHhT8hvACzLmvfLMkHz7qh4xEO3utW6SrX/Nq5/xyuuQ/WPqlr32ZSMDZGtG/ugEPWx/37eYUxQftEr+mXgE3OK1/y2/86bcw72D/gy435NfxF1j+t4z4CzxAWlbFeX98fxxFfOFUuVovcV+xyk5wE24SNkBbivZ8rbk7wN2cMoPJP8pcFLKf4icth+X8hB4esJ4inngqOm/CRr7sp/IX8YPgTtLZI+b/C84hU9Iece0XQFuB14H/pI2+w5aZX+V5z+uoOcIuK2C3CQ0sqDLOGe4jVO0jByLs7hJqvX0JK/lY5I/J+Vtxv98cMLI78s/UH0HrJAruVAuvgfPA1vAPVLWvrak/KGU9TXtlpTfN328LfUrNcduispO+msjfLrBQF+SR9UPS90FyWt/R8i/TGjdF0Ze8RW5BTXRpQ6CPmhZhLZw5DzScCD1H4+aunOezB3k1qTwyQF4CPic6bwPKiVoCTexHdwnlaZYwl07YO+HP4tvjVwIKvcJ8HhDvapgD0E94AP5VSWebDFAj/yKEernoIxZxTLO4HxW19jjpN/FKXkNN6E25AC8I31drSC7KXJVregVkfU/N8VEH9zqvkW+2hnwbITOe+Q+pWp/VYhU/AD8W0uj+uifl4yu2osRO89wE/ioovxJ6hEE8FxN+bro2xvvqx0M8FIN2RXgiQ50aIP+BnA+KDYdHCDeK4pY6O8XcsCFE/uNoKl9er5eMc1/9V+XSAQFkAgKIBEUQCIogERQAImgABJBASSCAkgEBZAICiARFEAiKIBEUACJoAASQQEkggJIBAWQCAogERRAIiiARFAAiaAAEkEBJIIC+B+ideJwoPTaGwAAAABJRU5ErkJggg==',
	playPause:
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACuElEQVR4nO2asWsUQRSHv5M0IqJoIQgKNoJgRO39A2KjjZ02KlrYKv4DIoqgCCII2lja2AkiQhCCBi1ENIqgkRAuwSIEBUFC7llMhCC5/W12d2bnzvfBFpfdN+/x3WNuZrIdM8Ppz4a2C8gdFyRwQQIXJHBBAhckcEECFyRwQQIXJHBBgtwFjQFdwPpc3ZVnqsSr2ICZFV3HzGzezBbM7KKZjYjnm766punWiC+KxczoiN38DLBr1ec3wBngnTTfDGWPGjo14vvFhptC0Fo3l4DrwBXgd4kC6jCQgv7yETgNvCpRRFVaF1Rnkt4HTAC3gE01xska1UHLlJM4DZwHnjVR1Cqy76CfJRIA7AGeAg+ArSVjBoIm10Edwpz0ATje4LitEmOhuBN4DDwCdkQYPykxV9IngCngVMQc0Ym91dgGPASeALsj54pCqr3YGPAeuJAwZyOkLHYzcAcYB/YmzFuLNr7NI8Bb4DIw0kL+ddFWu28ErgGTwMGWaihF2/PBYeA1Yf2UJWqrsQhsSVDHArB9jb9nv9VIxWLbBfRDCfqVoIZZ4GSCPJVQgpYi5jbgPrAfeBkxTy3a+pmdAc4RTgCyJvUcZMA9YJQBkANpO+gbcBZ4njBnbVJ0kAF3gQMMmByI30HThEXgeOQ80YjVQT3CxnSUAZYDcTroC6FrXkQYOzlNdlAPuE2Ya4ZCDjTXQZ8JXTPR0HjZULeDesBNwpHF0MkB3UG9gnufCF2T7TahCar843AZuAEcYsjlgO6g7/98niJ0zWSccvJDddAl4CvwA7hKOAFMKWeuxDPzNeKLYgOJ3xhb73XUzOYK3hCbXXmmSryKLfWG2X9PLkeu2eKCBC5I4IIELkjgggQuSOCCBC5I4IIELkjgggQuSOCCBC5I4IIELkjgggQuSOCCBC5I4IIELkjwBzKpUQ+5rDcZAAAAAElFTkSuQmCC',
	stop: 'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8UlEQVR4nO3aQUrEUBRFwRd3oTtyHbp1u91FnDiVM8iDbqQKMr18zuBDQo7zPIe/vTz6AM9OoCBQECgIFAQKAgWBgkBBoCBQ2Az0PjO3mTkf/Nx+z7LiWHxZvc3M69bYRfeZedsY2gz0bJ8Fjo0Rd1AQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQGEz0H1x66rvraHNQJ+zeLALvmbmY2ts8w+zf8kdFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoCBQ+AE4YDYi3FGM5wAAAABJRU5ErkJggg==',
	nextBookmark:
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC3UlEQVR4nO2asWsUQRSHv1PBQkRJo7EQbATBBGPvHxAbbey0UdHCVvAPECtBEUQQtLG0sQuICEEIRgJioVGEEAl6ikWICBZK7llMLpi7uXt7szOze977YIvL7s7v5dt3ezN32xARjN5sq7qAumOCFEyQgglSMEEKJkjBBCmYIAUTpGCCFEyQwigJmgaagHi25sb+LnyCTgHfgFXgKrAjQbFVZD0ExnvsG9/Y342IdG4rspUFEZn0HBdjy5lVhK7zig70W0Sui8jODEXnzOqk67yGdH8f1O8LovfAeWB+wPbuRV2y2jQ6/zDoTfoIMAfcBnYNeO6g5Mzqia+D1ikmbhm4DDwrkZ8zK1oH/SwYeAh4irv77y14TpVZQZSdBzVw94l3wOnS1dQna5NYE8UDwBPgMbAv0ph1yIo+kz4DLALnIo9bWVaKpcYY8AiYAQ4mGD9rVsq12DTwFriSOCdpVurCdwN3gVng8DBm5VrNnwDeANdIuyCNnuWbKK4Be8oO3IfXwAXcP5EzK8tSIwbHgQXcnKb2WVV0UJtVYHvGrLECx9Wig9qsDUOWT9Cv8DoK8xk4mzkrCJ+gP+G1qAjwADgKvMycFUTqj9x/WQEu4VblQ5OV4x4kwH1ggvRyomel7qBPwEXgeeKcZFmpOkiAe8Ak6eUkzUrRQcu4idlsgrGzZ8XsoBZusThBejnZsmJ10BLuSr6INF5dskp3UAu4g3v/py44Z9YmZTroI+5KzkWqpS5ZWwjpoBZwCzhG+oJzZnnxdVCrz/EfcFcyeOpeYVYQRX84XAduAlPELThnVhC+Dvre8XoRdyVfJcjPmRWG55GPKRFZEpEfInIjwWMoVWU1lUdfvhZ9/OV/5STut/39nn1fcKv/mc4doyQoiFF6iDMIE6RgghRMkIIJUjBBCiZIwQQpmCAFE6RgghRMkIIJUjBBCiZIwQQpmCAFE6RgghRMkIIJUjBBCiZI4S8EiGftK0iKHwAAAABJRU5ErkJggg==',
	previousBookmark:
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADxklEQVR4nO2aTWgdVRTHfwmlTRpKG1q0VEUqtEjSBglaFKs2C9v4VQVXpRsXLgvZdefGrLKooBKstVWyaIibiIV+UaoBqxYKIrQgZBObJsUGCWlKqeLH6eK+lMfkvpz33twz7xXOD2Yzc+f+z/u/M/fjzLSICE5lWhsdQLPjBim4QQpukIIbpOAGKbhBCm6Qghuk4AYpuEEKMYNeBaYBiRyzwNuFRdcExAwaBp6o0H4L8LFdOKwBBoE7wO/AbkOt1cCHwGJJ68VoKxHJHguiE7sv77FLRK5ldH410npORK5mtK7E2jbDGNQGDAE/At2Za51GWj8BOzLXHondsCpxALXyAvAl8HSzajUqg9qBI8Al7M3JpdWIDHoJOAFsq6JtR06tl4HjVWq1x04WmUEdwKfABNUFDPX/gUta39egtTplALXSR8iarQ+blnUGrQM+Ay5ib46JlmUG7QWOAU8aaiyxD/jcQssig9YDXwDnsDdnPeFxOmullTqDXiNkzeOJ+43xeknrMUuRVBnUCXwFnMHenE5gBDiNsTmQJoPeAo4SNrLWvEMYiDcXoAXky6CNwEngFPbmbAJGgW8o0ByoL4MWgVeAr4FH04YTpQ8Yo8Jm0pqWyMcLC4TZoRK3CSZVqhmlpGitDdmTsUcsuuTOsDZvNDUQ3SMVRcygagIaAP5KHMtKWvcK0lpGvYP0SaCXUHiyZhR4BvihAK1l5JnFfiOULgaAu2nCqcgksAc4RKhXF0beheL/wCfATuBC/nBUrWFCqfS8sdYDUq2kpwgbxvcJs2AqYsuQaaAfeA+YT6gVJeVmVQgbx27g20R9rlRRHAG6gPFEWmtiJy128zcJW4IDwJxB/+XcAt4tHX/k7KstdtKyYDZGyKZRQ40lxktaI6k7tq4o/gkcBN4EZoy15gnjUj9wPVWnRRXtTxNmn2OEscqS84RZdZgw8+UithfTfkB0z1IDewiD+VNVtm/JobW7pLW9Xq1GvDicIPzDHwH/GWtdIqzCh4B/6+mgERlUzvOEF3vZd/Ll5MmgcnoJVc+eWrQa/fHCZULgg8A/xlq/AM8CHwB/V31X5JMPjQWjT1J6Sp+glDNrpNUlIj9ntK7H2sZunlIMmjQKGhFZJSKHRWReRG6JyH5DrVYRGRCRORGZEZE3Yu1iY9BewrMaqzPfIKw1vqsnx2ugBfvlQFXEDHLKaPQg3fS4QQpukIIbpOAGKbhBCm6Qghuk4AYpuEEKbpCCG6TgBim4QQpukIIbpOAGKbhBCm6Qghuk4AYpuEEKbpDCfekGQ/WVqxxXAAAAAElFTkSuQmCC',
}

module.exports = imgs
