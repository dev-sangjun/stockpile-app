if(!self.define){let e,r={};const s=(s,c)=>(s=new URL(s+".js",c).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,i)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(r[o])return;let n={};const t=e=>s(e,o),d={module:{uri:o},exports:n,require:t};r[o]=Promise.all(c.map((e=>d[e]||t(e)))).then((e=>(i(...e),n)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-6560f00f.css",revision:null},{url:"assets/index-c3fe758a.js",revision:null},{url:"index.html",revision:"09003f69b0c6e9e9788102637723f3a5"},{url:"prisma/DBClient.js",revision:"d78780119997f9ebe4489a9793e5d08a"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"src/controllers/auth.controller.js",revision:"257f60bd9f6a3adb3a374caed060303b"},{url:"src/controllers/index.js",revision:"d61cc58d60232377b3b22c8da5b8274d"},{url:"src/controllers/investment.controller.js",revision:"a520edf6e7911c7801e8fb25f92c01f8"},{url:"src/controllers/portfolio.controller.js",revision:"b3a234e7d1e2505119fa62726881910b"},{url:"src/controllers/stock.controller.js",revision:"35f66cb747bfd1ecdc5d024a6b50eb93"},{url:"src/controllers/user.controller.js",revision:"c7e50ad66857dca185036d70997e92b8"},{url:"src/global/errors.global.js",revision:"150f6023ad7a9b52536d98f6489140a8"},{url:"src/interfaces/dto/auth-user.dto.js",revision:"8963201168a2449f79025884824955f2"},{url:"src/interfaces/dto/common.dto.js",revision:"8963201168a2449f79025884824955f2"},{url:"src/interfaces/dto/finnhub.dto.js",revision:"8963201168a2449f79025884824955f2"},{url:"src/interfaces/dto/investment.dto.js",revision:"8963201168a2449f79025884824955f2"},{url:"src/interfaces/dto/portfolio.dto.js",revision:"8963201168a2449f79025884824955f2"},{url:"src/interfaces/dto/stock.dto.js",revision:"8963201168a2449f79025884824955f2"},{url:"src/interfaces/dto/user.dto.js",revision:"8963201168a2449f79025884824955f2"},{url:"src/middlewares/auth.middleware.js",revision:"ae3d819bd8d449729cbd524527fbf721"},{url:"src/routes/auth.routes.js",revision:"76eb0c2a020ce86f94dc00f940eceec2"},{url:"src/routes/index.js",revision:"212b82f4afb3cc5fc50559d54ebade45"},{url:"src/routes/investment.routes.js",revision:"9af89b10cb6e17dcebb39524a58bef5d"},{url:"src/routes/portfolio.routes.js",revision:"d4bd8fbc65debbbb6d344aeae9f236c2"},{url:"src/routes/stock.routes.js",revision:"3595c4dcb34c4018275e7a826bb23318"},{url:"src/routes/user.routes.js",revision:"861c54834d5932b8d1f3e0934c903842"},{url:"src/schedulers/main.js",revision:"fd6c7aad2fab16d8a9aafc16e359b119"},{url:"src/schedulers/resync-stocks.scheduler.js",revision:"2f83ed0c858b2c29cedd0ed72abb12e7"},{url:"src/server.js",revision:"ff9854a6fc70b928959c3c127609d619"},{url:"src/services/auth.service.js",revision:"119fb7619e4a9209140793344b27125f"},{url:"src/services/finnhub.service.js",revision:"e37c39a505547b2605a16cf4f8e4c969"},{url:"src/services/index.js",revision:"720a28525b19c586881c27bf9382c602"},{url:"src/services/investment.service.js",revision:"e457fbc10b637d483924f925a5c7075d"},{url:"src/services/portfolio.service.js",revision:"8aad44e1fcc56cc4d7ae481ac15ac0ea"},{url:"src/services/stock.service.js",revision:"7231a695c8dd4e56242bbb73e0abc976"},{url:"src/services/user.service.js",revision:"bca340d2c53b5183cef17837ef30ce2f"},{url:"src/utils/errorHandler.js",revision:"9c061ecad584157a142711d5af3570a7"},{url:"manifest.webmanifest",revision:"df4a75dcfd215a45951af12b09a8de24"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
