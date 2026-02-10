const fs = require('fs');
const path = require('path');

const PRESENTATIONS_DIR = './presentations';
const OUTPUT_FILE = './index.html';
const TEMPLATE_FILE = './templates/index-template.html';

/**
 * 扫描所有演示文稿
 */
function scanPresentations() {
    const presentations = [];
    
    // 检查presentations目录是否存在
    if (!fs.existsSync(PRESENTATIONS_DIR)) {
        console.log('presentations/ 目录不存在，创建空目录...');
        fs.mkdirSync(PRESENTATIONS_DIR, { recursive: true });
        return presentations;
    }
    
    const dirs = fs.readdirSync(PRESENTATIONS_DIR);
    
    for (const dir of dirs) {
        const dirPath = path.join(PRESENTATIONS_DIR, dir);
        
        // 跳过非目录
        if (!fs.statSync(dirPath).isDirectory()) {
            continue;
        }
        
        const metadataPath = path.join(dirPath, 'metadata.json');
        
        // 检查是否有metadata.json
        if (fs.existsSync(metadataPath)) {
            try {
                const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
                metadata.path = `presentations/${dir}/index.html`;
                metadata.thumbnailPath = `presentations/${dir}/${metadata.thumbnail || 'thumbnail.png'}`;
                presentations.push(metadata);
            } catch (error) {
                console.error(`解析 ${metadataPath} 时出错:`, error.message);
            }
        } else {
            console.warn(`警告: ${dirPath} 缺少 metadata.json`);
        }
    }
    
    // 按日期排序（最新在前）
    presentations.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return presentations;
}

/**
 * 生成 HTML
 */
function generateHTML(presentations) {
    const template = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
    
    if (presentations.length === 0) {
        const emptyHTML = `
            <div class="empty-state">
                <h2>🎯 暂无演示文稿</h2>
                <p>在 presentations/ 目录下添加新的演示文稿，然后运行 npm run build</p>
            </div>
        `;
        return template.replace('{{PRESENTATIONS}}', emptyHTML);
    }
    
    const cardsHTML = presentations.map(ppt => `
        <div class="ppt-card">
            <a href="${ppt.path}">
                <img src="${ppt.thumbnailPath}" alt="${ppt.title}" onerror="this.src='https://via.placeholder.com/800x600?text=PPT'">
                <div class="card-content">
                    <h3>${ppt.title}</h3>
                    <p>${ppt.description}</p>
                    <div class="meta">
                        <span class="date">📅 ${ppt.date}</span>
                        <span class="slides">📄 ${ppt.slides || '?'} 幻灯片</span>
                    </div>
                    ${ppt.tags ? `<div class="tags">${ppt.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
                </div>
            </a>
        </div>
    `).join('\n');
    
    return template.replace('{{PRESENTATIONS}}', cardsHTML);
}

/**
 * 主函数
 */
function main() {
    console.log('🔍 扫描演示文稿...');
    const presentations = scanPresentations();
    console.log(`✅ 找到 ${presentations.length} 个演示文稿`);
    
    console.log('🔨 生成索引页...');
    const html = generateHTML(presentations);
    fs.writeFileSync(OUTPUT_FILE, html);
    
    console.log(`✨ 索引页已生成: ${OUTPUT_FILE}`);
}

// 执行
main();
